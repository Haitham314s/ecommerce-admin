import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/BillboardForm";

interface BillboardPageProps {
  params: { billboardId: string };
}

async function BillboardPage({ params: { billboardId } }: BillboardPageProps) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}

export default BillboardPage;
