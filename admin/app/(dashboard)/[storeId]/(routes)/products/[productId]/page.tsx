import prismadb from "@/lib/prismadb";
import ProductForm from "./components/ProductForm";

interface ProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

async function ProductPage({
  params: { storeId, productId },
}: ProductPageProps) {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          sizes={sizes}
          colors={colors}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;
