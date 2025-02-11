import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/prismaClient';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);

    if (session == null) {
      return NextResponse.json({ message: 'not logged in' }, { status: 401 });
    }

    const { email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const created = await prisma.admin.upsert({
      where: {
        email: email,
      },
      update: {
        password_digest: hashedPassword,
      },
      create: {
        email: email,
        password_digest: hashedPassword,
      },
    });

    return NextResponse.json({ email: created.email, id: created.id });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
