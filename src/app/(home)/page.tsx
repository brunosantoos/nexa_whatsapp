import HomeAdmin from '@/app/components/admin/Home';
import NoDataFound from '@/app/components/admin/NoDataFound';
import prisma from '@/lib/prisma/prismaClient';

const getReports = prisma.reportSend.findMany;

export default async function Home() {
  const data = await getReports();

  return <>{data.length === 0 ? <NoDataFound /> : <HomeAdmin data={data} />}</>;
}
