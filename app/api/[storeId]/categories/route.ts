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

    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.log("[CATEGORIES_POST]", error.message);
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

    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.log("[CATEGORIES_GET]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
