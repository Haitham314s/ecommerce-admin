import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
});

interface CurrencyProps {
  value?: string | number;
}

function Currency({ value }: CurrencyProps) {
  const [IsMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!IsMounted) return null;

  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
}

export default Currency;
