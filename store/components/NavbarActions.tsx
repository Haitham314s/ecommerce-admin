"use client";

import useCart from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";

interface Props {}

function NavbarActions({}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = useCart((state) => state.items);

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium">{items.length}</span>
      </Button>
    </div>
  );
}

export default NavbarActions;
