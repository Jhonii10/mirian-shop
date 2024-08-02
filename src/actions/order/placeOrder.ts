"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay session de usuario",
    };
  }

  const produts = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((product) => product.productId),
      },
    },
  });

  const itemInOrder = productsId.reduce(
    (count, product) => count + product.quantity,
    0
  );

  const { subtotal, tax, total } = productsId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = produts.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error(`${item.productId} no existe - 500`);
      }

      const subtotal = (product.price * productQuantity) / 1.19;

      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.19;
      totals.total += subtotal * 1.19;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  //crear transaccion db

  try {

    const prismaTx = await prisma.$transaction(async (tx) => {
      // actualizar el stock de los productos;
      const updatedProductsPromises = produts.map((product) => {
        const productQuantity = productsId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock <= 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // crear la orden - encacezado - detalles;
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemInOrder: itemInOrder,
          subTotal: subtotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productsId.map((p) => ({
                quantity: p.quantity,
                size: p.size as any,
                productId: p.productId,
                price:
                  produts.find((product) => product.id === p.productId)?.price ??
                  0,
              })),
            },
          },
        },
      });

      // crear la direcion de la orden

      const { country, ...rest } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...rest,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };


    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx

    }

  } catch (error) {
    return {
      ok: false,
      message: (error as any)?.message
    }
  }

};
