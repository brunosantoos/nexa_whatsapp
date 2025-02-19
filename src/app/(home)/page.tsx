import HomeAdmin from "@/app/components/admin/Home";
import NoDataFound from "@/app/components/admin/NoDataFound";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) redirect("/login");

  const data = await prisma.reportSend.findMany({
    where: {
      admin: {
        email: session.user!.email!,
      },
    },
  });

  return <>{data.length === 0 ? <NoDataFound /> : <HomeAdmin data={data} />}</>;
}
