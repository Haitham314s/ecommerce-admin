import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import BillboardClient from "./components/Client";
import { BillboardColumn } from "./components/Columns";

interface BillboardsPageProps {
  params: { storeId: string };
}

async function BillboardsPage({ params: { storeId } }: BillboardsPageProps) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy") as string,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}

export default BillboardsPage;
