"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import ApiList from "@/components/ui/ApiList";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { SizeColumn, columns } from "./Columns";

interface SizesClientProps {
  data: SizeColumn[];
}

function SizesClient({ data }: SizesClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />

        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>

      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
}

export default SizesClient;
