import Status from '@/app/components/admin/Status';
import prisma from '@/lib/prisma/prismaClient';

const getStatus = async () =>
  prisma.status.findMany({
    orderBy: {
      name: 'asc',
    },
  });

export const revalidate = 1;

export default async function Page() {
  const data = await getStatus();

  return <Status status={data} />;
}
