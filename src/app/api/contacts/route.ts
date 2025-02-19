import prisma from "@/lib/prisma/prismaClient";
import { NextResponse } from "next/server";
import z from "zod";

const dataSchema = z
  .object({
    nome: z.string(),
    numero: z.string(),
    email: z.string(),
    segmentacao: z.string(),
  })
  .array();

type DataProps = z.infer<typeof dataSchema>;

export async function POST(request: Request): Promise<Response> {
  const data: DataProps = await request.json();
  const errors: Error[] = [];

  for (const entry of data) {
    try {
      const { id } = await prisma.segmentation.upsert({
        where: {
          name: entry.segmentacao.toUpperCase(),
        },
        create: {
          name: entry.segmentacao.toUpperCase(),
        },
        update: {},
      });

      await prisma.contact.upsert({
        where: {
          phone: entry.numero,
        },
        create: {
          phone: entry.numero,
          name: entry.nome,
          email: entry.email,
          segmentation: {
            connect: {
              id,
            },
          },
        },
        update: {
          name: entry.nome,
          email: entry.email,
          segmentation: {
            connect: {
              id,
            },
          },
        },
      });
    } catch (e) {
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
