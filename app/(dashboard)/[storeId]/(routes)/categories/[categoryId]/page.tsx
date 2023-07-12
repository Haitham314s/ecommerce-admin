import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/CategoryForm";

interface CategoryPageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

async function CategoryPage({
  params: { categoryId, storeId },
}: CategoryPageProps) {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: { storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}

export default CategoryPage;
