import { Title } from "@/components";
import { ProductsGrid } from "@/components/products";
import { initialData } from "@/seed/seed";



export default function Home() {

  const products = initialData.products;

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"

      />

      <ProductsGrid products={products}/>
    </>
  );
}
