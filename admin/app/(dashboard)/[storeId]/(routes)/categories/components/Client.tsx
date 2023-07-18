"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import ApiList from "@/components/ui/ApiList";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { CategoryColumn, columns } from "./Columns";

interface CategoryClientProps {
  data: CategoryColumn[];
}

function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>

      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />
      <Separator />

      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}

export default CategoryClient;
