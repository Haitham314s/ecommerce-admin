import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

async function DashboardPage({ params: { storeId } }: DashboardPageProps) {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return (
    <div>
      <h1>Active Store: {store?.name}</h1>
    </div>
  );
}

export default DashboardPage;
