import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductsTable } from "./ui/ProductsTable";

interface Props {
    searchParams:{
      page?: string; 
    }
  }

export default async function ProductsPage({searchParams}:Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const {products , currentPage , totalPages}:any = await getPaginateProductsWithImages({page});
    
    if(products?.length === 0){ redirect('/'); }
  
    return (
      <>
        <Title
          title="Productos"
          className="mb-2"
  
        />
  
        <ProductsTable products={products}/>
        <Pagination totalPages={totalPages}/>
      </>
    );
}