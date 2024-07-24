import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductsGrid } from "@/components/products";
import { Gender } from "@prisma/client";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
    params:{
        gender: Gender
    },
    searchParams:{
      page?: string; 
    }
}



export default async function CategoryPage({params,searchParams}:Props) {

    const {gender} = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    if(gender !== "men" && gender !== "women" && gender !== "kid" ){
      notFound();
  }
    
    const {products , currentPage , totalPages}:any = await getPaginateProductsWithImages({gender , page});

    const label = {
        'men':'hombre',
        'women':'mujeres',
        'kid':'niños',
        'unisex':'todos',

    }
    

  return (

    <>

    <Title
        title={`Articulos para ${label[gender]}`}
        subtitle={`Todos los productos`}
        className="mb-2"

      />
    
    <ProductsGrid products={products}/>
    <Pagination totalPages={totalPages}/>
    </>
  );
}