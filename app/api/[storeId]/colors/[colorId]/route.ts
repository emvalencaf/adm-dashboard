import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prisma";

export async function GET(
    _req: Request,
    {
        params,
    }: {
        params: {
            colorId: string;
        };
    }
) {
    try {
        if (!params.colorId)
            return new NextResponse("Color Id is required", { status: 401 });


        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            },
        });

        return NextResponse.json(color);
    } catch (error: any) {
        console.log("[COLOR_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH (
    req: Request,
    { params } : {
        params: {
            storeId: string,
            colorId: string,
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

        const color = await prismadb.color.updateMany({
            where:{
                id: params.colorId,
                storeId: params.storeId,
            },
            data: {
                name,
                value,
            },
        });

        return NextResponse.json(color);
    } catch (error: any) {
        console.log("[COLOR_PATCH] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}


export async function DELETE (
    _req: Request,
    { params } : {
        params: {
            storeId: string,
            colorId: string,
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

        const color = await prismadb.color.deleteMany({
            where:{
                id: params.colorId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(color);
    } catch (error: any) {
        console.log("[COLOR_DELETE] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}