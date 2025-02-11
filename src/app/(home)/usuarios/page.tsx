import Admins from '@/app/components/admin/Admins';
import FormUser from '@/app/components/admin/Form/CreateUser';
import NoDataFound from '@/app/components/admin/NoDataFound';
import prisma from '@/lib/prisma/prismaClient';

const getAdmins = prisma.admin.findMany;

export default async function Users() {
  const data = await getAdmins();

  return (
    <>
      <FormUser />
      {data.length === 0 ? <NoDataFound /> : <Admins admins={data} />}
    </>
  );
}
