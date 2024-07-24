import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductsGrid } from "@/components/products";
import { redirect } from "next/navigation";

export const revalidate = 60;

interface Props {
  searchParams:{
    page?: string; 
  }
}

export default async function Home({searchParams}:Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products , currentPage , totalPages}:any = await getPaginateProductsWithImages({page});
  
  if(products.length === 0){ redirect('/'); }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"

      />

      <ProductsGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </>
  );
}
