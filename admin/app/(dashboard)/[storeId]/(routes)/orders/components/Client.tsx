"use client";

import { DataTable } from "@/components/ui/DataTable";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { OrderColumn, columns } from "./Columns";

interface OrderClientProps {
  data: OrderColumn[];
}

function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}

export default OrderClient;
