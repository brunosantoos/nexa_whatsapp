import prisma from "@/lib/prisma/prismaClient";

export default async function createInstance({
  name,
  idToken,
}: {
  name: string;
  idToken: string;
}) {
  try {
    const res = await prisma.tokenId.create({
      data: {
        name,
        idToken,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}
