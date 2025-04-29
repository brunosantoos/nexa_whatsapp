import prisma from "@/lib/prisma/prismaClient";
import { NextResponse } from "next/server";
import z from "zod";

const dataSchema = z
  .object({
    nome: z.string(),
    numero: z.string(),
    segmentacao: z.string(),
  })
  .array();

type DataProps = z.infer<typeof dataSchema>;

export async function POST(request: Request): Promise<Response> {
  const data: DataProps = await request.json();
  const errors: Error[] = [];

  for (const entry of data) {
    try {
      const segmentation = await prisma.segmentation.upsert({
        where: {
          name: entry.segmentacao.toUpperCase(),
        },
        create: {
          name: entry.segmentacao.toUpperCase(),
        },
        update: {},
      });

      const existingContact = await prisma.contact.findUnique({
        where: {
          phone: entry.numero,
        },
        include: {
          segmentation: true,
        },
      });

      if (existingContact) {
        await prisma.contact.update({
          where: {
            phone: entry.numero,
          },
          data: {
            name: entry.nome,
            segmentation: {
              connect: {
                id: segmentation.id,
              },
            },
          },
        });
      } else {
        await prisma.contact.create({
          data: {
            phone: entry.numero,
            name: entry.nome,
            segmentation: {
              connect: {
                id: segmentation.id,
              },
            },
          },
        });
      }
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        errors.push(e);
      }
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 500 });
  }

  return NextResponse.json({});
}
