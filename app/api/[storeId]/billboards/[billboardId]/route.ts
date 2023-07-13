import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prisma";

export async function GET(
    _req: Request,
    {
        params,
    }: {
        params: {
            billboardId: string;
        };
    }
) {
    try {
        if (!params.billboardId)
            return new NextResponse("Billboard Id is required", { status: 401 });


        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        });

        return NextResponse.json(billboard);
    } catch (error: any) {
        console.log("[BILLBOARD_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH (
    req: Request,
    { params } : {
        params: {
            storeId: string,
            billboardId: string,
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
            label,
            imageUrl,
        } = body;

        // form field validation
        if (!label)
            return new NextResponse("Label is required", { status: 400 });

        if (!imageUrl)
            return new NextResponse("Image URL is required", { status: 400 });

        const billboard = await prismadb.billboard.updateMany({
            where:{
                id: params.billboardId,
                storeId: params.storeId,
            },
            data: {
                label,
                imageUrl,
            },
        });

        return NextResponse.json(billboard);
    } catch (error: any) {
        console.log("[BILLBOARD_PATCH] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}


export async function DELETE (
    _req: Request,
    { params } : {
        params: {
            storeId: string,
            billboardId: string,
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

        const billboard = await prismadb.billboard.deleteMany({
            where:{
                id: params.billboardId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(billboard);
    } catch (error: any) {
        console.log("[BILLBOARD_DELETE] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}