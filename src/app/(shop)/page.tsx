import { getPaginateProductsWithImages } from "@/actions";
import { Title } from "@/components";
import { ProductsGrid } from "@/components/products";
import { initialData } from "@/seed/seed";

interface Props {
  searchParams:{
    page?: string; 
  }
}

export default async function Home({searchParams}:Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  

  const {products}:any = await getPaginateProductsWithImages({page});


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
