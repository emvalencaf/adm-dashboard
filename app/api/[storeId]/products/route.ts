import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prisma";

export async function POST(
    req: Request,
    {
        params,
    }: {
        params: {
            storeId: string;
        };
    }
) {
    try {
        if (!params.storeId)
            return new NextResponse("Store Id is required", { status: 401 });

        const { userId } = auth();

        const body = await req.json();

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
        } = body;

        if (!userId)
            return new NextResponse("Unauthenticated", { status: 401 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId)
            return new NextResponse("Unauthorized", { status: 403 });

        if (!name) return new NextResponse("Name is required", { status: 400 });

        if (!price)
            return new NextResponse("Price is required", { status: 400 });
        if (!categoryId)
            return new NextResponse("Category Id is required", { status: 400 });
        if (!sizeId)
            return new NextResponse("Size Id is required", { status: 400 });
        if (!colorId)
            return new NextResponse("Color Id is required", { status: 400 });
        if (!images || !images.length)
            return new NextResponse("Images are required", { status: 400 });
        const product = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string}) => image)
                        ],
                    },
                },
                isArchived,
                isFeatured,
            },
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.log("[PRODUCT_POST]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            storeId: string;
        };
    }
) {
    try {

        // filters
        const { searchParams } = new URL(req.url);

        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured");

        if (!params.storeId)
            return new NextResponse("Store Id is required", { status: 401 });

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(products);
    } catch (error: any) {
        console.log("[PRODUCT_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
