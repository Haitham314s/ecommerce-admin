import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import CategoryClient from "./components/Client";
import { CategoryColumn } from "./components/Columns";

interface CategoriesPageProps {
  params: { storeId: string };
}

async function CategoriesPage({ params: { storeId } }: CategoriesPageProps) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM dd, yyyy") as string,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}

export default CategoriesPage;
