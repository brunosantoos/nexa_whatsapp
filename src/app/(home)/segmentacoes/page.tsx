import DataTable from '@/app/components/admin/DataTable';
import prisma from '@/lib/prisma/prismaClient';
import { format } from 'date-fns';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

export const revalidate = 1;

export default async function Page() {
  const data = await prisma.segmentation.findMany({
    include: {
      contacts: {
        select: {
          _count: true,
        },
      },
    },
  });

  return (
    <DataTable
      data={data}
      titles={['Nome', 'Criada em', 'Total de contatos', 'Detalhes']}
      idExtractor={(row) => row.name.toString()}
      rowGenerator={(row) => [
        row.name,
        format(row.created_at, 'dd/MM/yyyy'),
        row.contacts.length,
        <Link href={`/segmentacoes/${row.id}`} key={row.id}>
          <FaEye />
        </Link>,
      ]}
    />
  );
}
