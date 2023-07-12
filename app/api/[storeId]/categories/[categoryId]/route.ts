import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface ParamProps {
  params: {
    storeId: string;
    categoryId: string;
  };
}

export async function GET(
  _req: Request,
  { params: { categoryId } }: ParamProps
) {
  try {
    if (!categoryId)
      return new NextResponse("Category id is required", { status: 400 });

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("[CATEGORY_DELETE]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params: { storeId, categoryId } }: ParamProps
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorised", { status: 403 });

    const category = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("[CATEGORY_PATCH]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: { storeId, categoryId } }: ParamProps
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!categoryId)
      return new NextResponse("Category id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorised", { status: 403 });

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("[CATEGORY_DELETE]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
