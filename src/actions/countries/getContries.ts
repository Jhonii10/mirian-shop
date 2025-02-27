import { prisma } from "@/lib/prisma"

export const getContries = async () => {
    try {
        const countries = await prisma.country.findMany();
        return countries;
    } catch (error) {
        console.log(error);
        return []
    }
}
