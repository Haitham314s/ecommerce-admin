"use client";

import StoreModal from "@/components/modals/StoreModal";
import { useEffect, useState } from "react";

type Props = {};

function ModalProvider({}: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
}

export default ModalProvider;
