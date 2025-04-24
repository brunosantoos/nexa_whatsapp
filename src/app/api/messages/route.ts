import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return NextResponse.json({ message: "not logged in" }, { status: 401 });
  }

  try {
    const { content, slug, image } = (await request.json()) as {
      content: string;
      slug: string;
      image?: string;
    };

    await prisma.messages.create({
      data: {
        slug,
        content,
        haveMedia: !!image,
        mediaUrl: image ? image : null,
      },
    });

    return NextResponse.json("");
  } catch (e) {
    console.error(e);
    return NextResponse.json({ e }, { status: 500 });
  }
}
