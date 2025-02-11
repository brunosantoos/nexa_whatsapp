import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/prismaClient';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type StatusProps = { status?: boolean };

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
    const { status } = (await request.json()) as Partial<StatusProps>;

    await prisma.status.update({
      where: { id: +id },
      data: { status: status },
    });

    return NextResponse.json('');
  } catch (e) {
    console.error(e);
    return NextResponse.json({ e }, { status: 500 });
  }
}
