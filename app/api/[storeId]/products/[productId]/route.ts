import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prisma";

export async function GET(
    _req: Request,
    {
        params,
    }: {
        params: {
            productId: string;
        };
    }
) {
    try {
        if (!params.productId)
            return new NextResponse("Product Id is required", { status: 401 });


        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            }
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.log("[PRODUCT_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH (
    req: Request,
    { params } : {
        params: {
            storeId: string,
            productId: string,
        },
    }
) {

    try {

        // params validation
        if (!params.storeId) return new NextResponse("Store id is required", { status: 400 });
        
        const {
            userId
        } = auth();

        // credentials validation
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

        // check if user is authorized
        const storeyByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeyByUserId)
            return new NextResponse("Unauthorized", { status: 403 });

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

        // form field validation
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

        await prismadb.product.update({
            where:{
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                images: {
                    deleteMany: {}
                },
                isFeatured,
                isArchived,
            },
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            },
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.log("[PRODUCT_PATCH] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}


export async function DELETE (
    _req: Request,
    { params } : {
        params: {
            storeId: string,
            productId: string,
        },
    }
) {

    try {

        // params validation
        if (!params.storeId) return new NextResponse("Store id is required", { status: 400 });
        
        const {
            userId
        } = auth();

        // credentials validation
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

        // check if user is authorized
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId)
            return new NextResponse("Unauthorized", { status: 403 });

        const product = await prismadb.product.deleteMany({
            where:{
                id: params.productId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.log("[PRODUCT_DELETE] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}