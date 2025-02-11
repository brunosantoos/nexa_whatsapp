import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/prismaClient';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
): Promise<Response> {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return NextResponse.json({ message: 'not logged in' }, { status: 401 });
  }

  try {
    const { content, slug } = await request.json();

    await prisma.messages.update({
      where: { id: +id },
      data: {
        slug,
        content,
      },
    });

    return NextResponse.json('');
  } catch (e) {
    console.error(e);
    return NextResponse.json({ e }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  }
): Promise<Response> {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return NextResponse.json({ message: 'not logged in' }, { status: 401 });
  }

  try {
    await prisma.messages.delete({
      where: { id: +id },
    });

    const path = request.nextUrl.searchParams.get('path') || '/mensagens';
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 500 });
  }
}
