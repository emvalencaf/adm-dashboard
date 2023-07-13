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

        const { name, billboardId } = body;

        if (!userId)
            return new NextResponse("Unauthenticated", { status: 401 });

        const storeyByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeyByUserId)
            return new NextResponse("Unauthorized", { status: 403 });

        if (!name)
            return new NextResponse("Name is required", { status: 400 });

        if (!billboardId)
            return new NextResponse("Billboard Id is required", { status: 400 });

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(category);
    } catch (error: any) {
        console.log("[CATEGORY_POST]: ", error);
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
        if (!params.storeId)
            return new NextResponse("Store Id is required", { status: 401 });


        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(categories);
    } catch (error: any) {
        console.log("[CATEGORIES_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
