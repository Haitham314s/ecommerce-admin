import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import ColorsClient from "./components/Client";
import { ColorColumn } from "./components/Columns";

interface ColorsPageProps {
  params: { storeId: string };
}

async function ColorsPage({ params: { storeId } }: ColorsPageProps) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM dd, yyyy") as string,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}

export default ColorsPage;
