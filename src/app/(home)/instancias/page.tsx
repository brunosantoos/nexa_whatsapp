import DataTable from "@/app/components/admin/DataTable";
import NoDataFound from "@/app/components/admin/NoDataFound";
import prisma from "@/lib/prisma/prismaClient";
import Form from "./Form";

export const revalidate = 1;

export default async function Page() {
  const data = await prisma.tokenId.findMany();

  if (!data) {
    return <NoDataFound />;
  }

  return (
    <>
      <Form />
      <DataTable
        data={data}
        titles={["Nome", "id setor", "numero", "Editar"]}
        idExtractor={(row) => row.id.toString()}
        rowGenerator={(row) => [
          row.name,
          row.idToken,
          row.number,
          <Form token={row} key={row.id} />,
        ]}
      />
    </>
  );
}
