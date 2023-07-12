import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prisma";

export async function PATCH (
    req: Request,
    { params } : {
        params: {
            storeId: string,
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

        const body = await req.json();

        const {
            name,
        } = body;

        // form field validation
        if (!name) return new NextResponse("Name is required", { status: 400 });

        const store = await prismadb.store.updateMany({
            where:{
                id: params.storeId,
                userId,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(store);
    } catch (error: any) {
        console.log("[STORE_PATCH] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}


export async function DELETE (
    _req: Request,
    { params } : {
        params: {
            storeId: string,
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

        const store = await prismadb.store.deleteMany({
            where:{
                id: params.storeId,
                userId,
            },
        });

        return NextResponse.json(store);
    } catch (error: any) {
        console.log("[STORE_DELETE] : ", error); // DEV LOG
        
        return new NextResponse("Internal error", { status: 500, });
    }

}