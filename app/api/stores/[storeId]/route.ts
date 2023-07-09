import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface PatchProps {
  params: { storeId: string };
}

export async function PATCH(req: Request, { params: { storeId } }: PatchProps) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    console.error("[STORE_PATCH]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params: { storeId } }: PatchProps
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    console.error("[STORE_DELETE]:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
