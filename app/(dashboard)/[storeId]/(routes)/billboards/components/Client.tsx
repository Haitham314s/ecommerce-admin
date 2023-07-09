"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { useParams, useRouter } from "next/navigation";

type Props = {};

function BillboardClient({}: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
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
    </>
  );
}

export default BillboardClient;
