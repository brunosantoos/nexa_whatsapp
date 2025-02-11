import DataTable from '@/app/components/admin/DataTable';
import NoDataFound from '@/app/components/admin/NoDataFound';
import prisma from '@/lib/prisma/prismaClient';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import ModalSendMessageProps from './send';

export const revalidate = 1;

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;

  const data = await prisma.contact.findMany({
    where: {
      segmentation: {
        some: {
          id: +id,
        },
      },
    },
  });

  if (!data) {
    return <NoDataFound />;
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <Link
          href={'/segmentacoes'}
          className="bg-[#0493C7] px-4 py-2 rounded-md text-white font-bold flex max-w-[10%] text-center items-center"
        >
          <FaArrowLeft className="text-center mr-2" /> {' Voltar'}
        </Link>
        <ModalSendMessageProps id={+id} totalContacts={data.length} />
      </div>
      <DataTable
        data={data}
        titles={['Nome', 'Número', 'E-mail', 'Curso']}
        idExtractor={(row) => row.id.toString()}
        rowGenerator={(row) => [row.name, row.phone, row.email, row.course]}
      />
    </>
  );
}
