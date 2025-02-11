import Loading from '@/app/components/Loading';
import FormMessage from '@/app/components/admin/Form/Message';
import Message from '@/app/components/admin/Message';
import NoDataFound from '@/app/components/admin/NoDataFound';
import prisma from '@/lib/prisma/prismaClient';

const getMessages = prisma.messages.findMany;
export const revalidate = 1;

export default async function Page() {
  const data = await getMessages();

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <FormMessage />
      {data.length === 0 ? <NoDataFound /> : <Message data={data} />}
    </>
  );
}
