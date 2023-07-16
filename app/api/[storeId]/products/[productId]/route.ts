import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface ParamProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export async function GET(
  _req: Request,
  { params: { productId } }: ParamProps
) {
  try {
    if (!productId)
      return new NextResponse("Product id is required", { status: 400 });

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("[PRODUCT_GET]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params: { storeId, productId } }: ParamProps
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      images,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category id is required", { status: 400 });
    if (!sizeId)
      return new NextResponse("Size id is required", { status: 400 });
    if (!colorId)
      return new NextResponse("Color id is required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Images are required", { status: 400 });
    if (!productId)
      return new NextResponse("Product id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorised", { status: 403 });

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        storeId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("[PRODUCT_PATCH]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: { storeId, productId } }: ParamProps
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!productId)
      return new NextResponse("Product id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorised", { status: 403 });

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("[PRODUCT_DELETE]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
