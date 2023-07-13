import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prisma";

export async function GET(
    _req: Request,
    {
        params,
    }: {
        params: {
            categoryId: string;
        };
    }
) {
    try {
        if (!params.categoryId)
            return new NextResponse("Category Id is required", { status: 401 });


        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
        });

        return NextResponse.json(category);
    } catch (error: any) {
        console.log("[CATEGORY_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH (
    req: Request,
    { params } : {
        params: {
            storeId: string,
            categoryId: string,
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
            billboardId,
        } = body;

        // form field validation
        if (!name)
            return new NextResponse("Name is required", { status: 400 });

        if (!billboardId)
            return new NextResponse("Billboard Id is required", { status: 400 });

        const category = await prismadb.category.updateMany({
            where:{
                id: params.categoryId,
                storeId: params.storeId,
            },
            data: {
                name,
                billboardId,
            },
        });

        return NextResponse.json(category);
    } catch (error: any) {
        console.log("[CATEGORY_PATCH] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}


export async function DELETE (
    _req: Request,
    { params } : {
        params: {
            storeId: string,
            categoryId: string,
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

        const category = await prismadb.category.deleteMany({
            where:{
                id: params.categoryId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(category);
    } catch (error: any) {
        console.log("[CATEGORY_DELETE] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}