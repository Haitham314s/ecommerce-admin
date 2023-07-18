import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  params: { storeId: string };
}

async function DashboardLayout({
  children,
  params: { storeId },
}: DashboardLayoutProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default DashboardLayout;
