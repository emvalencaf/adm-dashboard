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

        const { label, imageUrl } = body;

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

        if (!label)
            return new NextResponse("Label is required", { status: 400 });

        if (!imageUrl)
            return new NextResponse("Image URL is required", { status: 400 });

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(billboard);
    } catch (error: any) {
        console.log("[BILLBOARD_POST]: ", error);
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


        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(billboards);
    } catch (error: any) {
        console.log("[BILLBOARD_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
