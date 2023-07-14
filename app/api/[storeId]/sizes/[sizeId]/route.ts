import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prisma";

export async function GET(
    _req: Request,
    {
        params,
    }: {
        params: {
            sizeId: string;
        };
    }
) {
    try {
        if (!params.sizeId)
            return new NextResponse("Size Id is required", { status: 401 });


        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            },
        });

        return NextResponse.json(size);
    } catch (error: any) {
        console.log("[SIZE_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH (
    req: Request,
    { params } : {
        params: {
            storeId: string,
            sizeId: string,
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

        const body = await req.json();

        const {
            name,
            value,
        } = body;

        // form field validation
        if (!name)
            return new NextResponse("Name is required", { status: 400 });

        if (!value)
            return new NextResponse("Value is required", { status: 400 });

        const size = await prismadb.size.updateMany({
            where:{
                id: params.sizeId,
                storeId: params.storeId,
            },
            data: {
                name,
                value,
            },
        });

        return NextResponse.json(size);
    } catch (error: any) {
        console.log("[SIZE_PATCH] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}


export async function DELETE (
    _req: Request,
    { params } : {
        params: {
            storeId: string,
            sizeId: string,
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

        const size = await prismadb.size.deleteMany({
            where:{
                id: params.sizeId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(size);
    } catch (error: any) {
        console.log("[SIZE_DELETE] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}