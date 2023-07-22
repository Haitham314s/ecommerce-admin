import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import Overview from "@/components/Overview";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import CardItem from "./components/CardItem";
interface DashboardPageProps {
  params: { storeId: string };
}

async function DashboardPage({ params: { storeId } }: DashboardPageProps) {
  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stockCount = await getStockCount(storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />

        <div className="grid gap-4 grid-cols-3">
          <CardItem
            title="Total Revenue"
            headerIcon={
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            }
            content={formatter.format(totalRevenue)}
          />

          <CardItem
            title="Sales"
            headerIcon={
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            }
            content={salesCount}
          />

          <CardItem
            title="Product In Stock"
            headerIcon={<Package className="h-4 w-4 text-muted-foreground" />}
            content={stockCount}
          />

          <CardItem
            title="Overview"
            contentClassName="pl-2"
            content={<Overview />}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
