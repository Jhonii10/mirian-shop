import { Title } from "@/components";
import { ProductsGrid } from "@/components/products";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params:{
        id: string
    }
}


export default function CategoryPage({params}:Props) {

    const {id} = params;
    const products = initialData.products;
    const productsFilterGender = products.filter(product => product.gender === id);

    const label = {
        'men':'hombre',
        'women':'mujeres',
        'kid':'niños',
        'unisex':'todos',

    }
    

    if(id !== "men" && id !== "women" && id !== "kid" ){
        notFound();
    }

  return (

    <>

    <Title
        title={`Articulos para ${label[id]}`}
        subtitle={`Todos los productos`}
        className="mb-2"

      />
    
    <ProductsGrid products={productsFilterGender}/>
    
    </>
  );
}