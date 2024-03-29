import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ReactNode } from "react";

interface Props {
  title: string;
  headerIcon?: ReactNode;
  cardClassName?: string;
  contentClassName?: string;
  content: string | number | ReactNode;
}

function CardItem({
  title,
  headerIcon,
  cardClassName,
  contentClassName,
  content,
}: Props) {
  return (
    <Card {...(cardClassName ? { className: cardClassName } : {})}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {headerIcon && headerIcon}
      </CardHeader>

      <CardContent
        {...(contentClassName ? { className: contentClassName } : {})}
      >
        {["string", "number"].includes(typeof content) ? (
          <div className="text-2xl font-bold">{content}</div>
        ) : (
          content
        )}
      </CardContent>
    </Card>
  );
}

export default CardItem;
