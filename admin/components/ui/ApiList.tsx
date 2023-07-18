"use client";

import { useOrigin } from "@/hooks/UseOrigin";
import { useParams } from "next/navigation";
import ApiAlert from "./ApiAlert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

function ApiList({ entityName, entityIdName }: ApiListProps) {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}

export default ApiList;
