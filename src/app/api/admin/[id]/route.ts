import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/prismaClient';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type AdminProps = { email?: string; password?: string };

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
    const { email, password } = (await request.json()) as Partial<AdminProps>;

    const data: { email?: string; password_digest?: string } = {};
    if (email) data.email = email;
    if (password) data.password_digest = await bcrypt.hash(password, 12);

    await prisma.admin.update({
      where: { id: +id },
      data,
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
    await prisma.admin.delete({
      where: { id: +id },
    });

    const path = request.nextUrl.searchParams.get('path') || '/admin/admins';
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 500 });
  }
}
