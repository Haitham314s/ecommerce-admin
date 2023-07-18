import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface ParamProps {
  params: {
    storeId: string;
    billboardId: string;
  };
}

export async function GET(
  _req: Request,
  { params: { billboardId } }: ParamProps
) {
  try {
    if (!billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error: any) {
    console.error("[BILLBOARD_GET]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params: { storeId, billboardId } }: ParamProps
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image url is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorised", { status: 403 });

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error: any) {
    console.error("[BILLBOARD_PATCH]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: { storeId, billboardId } }: ParamProps
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorised", { status: 403 });

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error: any) {
    console.error("[BILLBOARD_DELETE]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
