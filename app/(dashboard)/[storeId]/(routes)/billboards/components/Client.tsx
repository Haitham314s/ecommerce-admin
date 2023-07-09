"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./Columns";

interface BillboardClientProps {
  data: BillboardColumn[];
}

function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboartds for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
}

export default BillboardClient;
