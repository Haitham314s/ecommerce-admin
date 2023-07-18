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

    const { name, value } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value) return new NextResponse("Value is required", { status: 400 });
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

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error: any) {
    console.log("[COLORS_POST]", error.message);
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

    const colors = await prismadb.color.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error: any) {
    console.log("[COLORS_GET]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
