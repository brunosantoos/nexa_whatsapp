import DataTable from "@/app/components/admin/DataTable";
import NoDataFound from "@/app/components/admin/NoDataFound";
import prisma from "@/lib/prisma/prismaClient";

export const revalidate = 1;

export default async function Page() {
  const data = await prisma.contact.findMany();

  if (!data) {
    return <NoDataFound />;
  }

  return (
    <DataTable
      data={data}
      titles={["Nome", "Numero"]}
      idExtractor={(row) => row.id.toString()}
      rowGenerator={(row) => [row.name, row.phone, row.email]}
    />
  );
}
