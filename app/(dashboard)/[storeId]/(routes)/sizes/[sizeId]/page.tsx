import prismadb from "@/lib/prismadb";
import SizeForm from "./components/SizeForm";

interface SizePageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

async function SizePage({ params: { categoryId, storeId } }: SizePageProps) {
  const size = await prismadb.size.findUnique({
    where: {
      id: categoryId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}

export default SizePage;
