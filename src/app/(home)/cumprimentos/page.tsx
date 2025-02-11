import Loading from '@/app/components/Loading';
import FormGreeting from '@/app/components/admin/Form/Greeting';
import Greeting from '@/app/components/admin/Greeting';
import NoDataFound from '@/app/components/admin/NoDataFound';
import prisma from '@/lib/prisma/prismaClient';

const getGreeting = prisma.greeting.findMany;
export const revalidate = 1;

export default async function Page() {
  const data = await getGreeting();

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <FormGreeting />
      {data.length === 0 ? <NoDataFound /> : <Greeting data={data} />}
    </>
  );
}
