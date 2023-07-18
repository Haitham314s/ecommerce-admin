import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface PostParamsProps {
  params: {
    storeId: string;
  };
}

export async function POST(
  req: Request,
  { params: { storeId } }: PostParamsProps
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image url is required", { status: 400 });
    if (!storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorised", { status: 403 });

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error: any) {
    console.log("[BILLBOARDS_POST]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params: { storeId } }: PostParamsProps
) {
  try {
    if (!storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error: any) {
    console.log("[BILLBOARDS_GET]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
