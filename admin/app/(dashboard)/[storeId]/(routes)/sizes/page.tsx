import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import SizesClient from "./components/Client";
import { SizeColumn } from "./components/Columns";

interface SizesPageProps {
  params: { storeId: string };
}

async function SizesPage({ params: { storeId } }: SizesPageProps) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM dd, yyyy") as string,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
}

export default SizesPage;
