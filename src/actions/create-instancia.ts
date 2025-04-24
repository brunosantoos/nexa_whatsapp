import prisma from "@/lib/prisma/prismaClient";

export default async function createInstance({
  name,
  idToken,
  number,
}: {
  name: string;
  idToken: string;
  number: string;
}) {
  try {
    const res = await prisma.tokenId.create({
      data: {
        name,
        idToken,
        number,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}
