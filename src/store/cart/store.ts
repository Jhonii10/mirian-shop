import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    addProductToCart: (product:CartProduct)=>void;
    getTotalProductsIncart:()=>number;
    updateProductQuantity: (product:CartProduct , quantity:number)=>void;
    removeProductFromCart: (product:CartProduct)=>void;
}

export const useCartStore = create<State>()(

    persist(
        (set,get)=>({
            cart:[],
            addProductToCart(product:CartProduct) {
                
                
                const {cart} = get();
    
                // Revisar si existe el producto existe en el carrito
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )
    
                if (!productInCart) {
                    set({cart:[...cart, product]})
                    return;
                }
    
                // si el producto existe incrementar
                const updateCartProducts = cart.map((item)=>{
                        if (item.id === product.id && item.size === product.size) {
                            return {
                                ...item,
                                quantity: item.quantity + product.quantity,
    
                            }
                        }
    
                        return item;
                });
    
                set({cart:updateCartProducts})
            },

            getTotalProductsIncart:()=>{
                const {cart} = get();
                const total = (cart.map((item => item.quantity ))).reduce((acc, val) => acc + val, 0)
                return total;
            },

            updateProductQuantity:(product:CartProduct , quantity:number)=>{

                const {cart} = get();
                

                const updateCartProducts = cart.map((item)=>{
                    if (item.id === product.id && item.size === product.size) {

                        return {
                            ...item,
                            quantity:quantity,

                        }
                    }

                    return item;
                });

                set({cart:updateCartProducts})
   
            },

            removeProductFromCart:(product:CartProduct)=>{

                const {cart} = get();
               
                const removeProduct = cart.filter(item => item.id !== product.id || item.size !== product.size);

                set({cart:removeProduct})
                    
            }
        }),
        {
            name: "cart",
        }
    )

    
)