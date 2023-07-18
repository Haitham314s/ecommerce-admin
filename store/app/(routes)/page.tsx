import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";

export const revalidate = 0;
const BILLBOARD_ID = process.env.NEXT_PUBLIC_BILLBOARD_ID!;

interface Props {}

async function HomePage({}: Props) {
  const billboard = await getBillboard(BILLBOARD_ID);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  );
}

export default HomePage;
