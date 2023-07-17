import prismadb from "../../lib/prisma";

const getSalesCount = async (storeId: string) => {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true,
        },
    });

    return salesCount;
}

export default getSalesCount;