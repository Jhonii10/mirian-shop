import { initialData } from "./seed";
import { prisma } from '../lib/prisma';
import { countries } from './seed-countries';


async function main(){
    
    // remove tables database 

    
    await prisma.orderAddress.deleteMany(),
    await prisma.orderItem.deleteMany(),
    await prisma.order.deleteMany(),
    
    
    await Promise.all([
         prisma.productImage.deleteMany(),
         prisma.product.deleteMany(),
         prisma.userAddress.deleteMany(),
         prisma.user.deleteMany(),
         prisma.country.deleteMany(),
         
    ])

    await prisma.category.deleteMany();

    // categories
    const {categorys,products , users} = initialData

    const categoryData = categorys.map(category =>({name:category}));
    
    await prisma.category.createMany({
        data:categoryData
    })

    const categoriesDb = await prisma.category.findMany();

    const categoriesMap = categoriesDb.reduce((map , category)=>{
        map[category.name.toLowerCase()] = category.id
        return map;
    },{} as Record<string,string>)
    
    // Product
    products.forEach(async (product)=>{

        const {images,type, ...rest} = product;

        const dbProduct = await prisma.product.create({
            data:{
                ...rest,
                categoryId:categoriesMap[type]
            }
        })


        const imagesData = images.map(image=>{
            return {
                url:image,
                productId:dbProduct.id
            }
        })

        await prisma.productImage.createMany({
            data:imagesData
        })

    })

    // user 
    await prisma.user.createMany({
        data:users
    })

    // countries
    await prisma.country.createMany({
        data:countries
    })


    console.log('Seed init');
    
}


(()=>{
    if(process.env.NODE_ENV === 'production') return;
    else{
        main();
    }
 
})();