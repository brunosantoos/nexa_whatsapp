import Loading from '@/app/components/Loading';
import DataTable from '@/app/components/admin/DataTable';
import NoDataFound from '@/app/components/admin/NoDataFound';
import prisma from '@/lib/prisma/prismaClient';
import { format } from 'date-fns';

export const revalidate = 1;

export default async function Page() {
  const data = await prisma.reportSend.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {data.length === 0 ? (
        <NoDataFound />
      ) : (
        <DataTable
          data={data}
          titles={['Número', 'Mensagem', 'Enviado dia']}
          idExtractor={(row) => row.id.toString()}
          rowGenerator={(row) => [
            row.phone,
            row.message,
            format(row.created_at, 'dd/MM/yyyy, HH:mm'),
            ,
          ]}
        />
      )}
    </>
  );
}
