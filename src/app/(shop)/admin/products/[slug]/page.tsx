import { getCategories, getProductByslug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params:{
        slug:string
    }
}

export const revalidate = 0

export default async function ProductSlugPage({params}:Props) {

    const {slug} = params;
    const product = await getProductByslug(slug)
    const categories = await getCategories();

    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto':'Editar producto'

  return (
    <div className="px-0 sm:px-4">
      <Title title={title}/>
      <ProductForm product={product ?? {}} categories={categories}/>
    </div>
  );
}