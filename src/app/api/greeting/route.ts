import prisma from '@/lib/prisma/prismaClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<Response> {
  try {
    const { text } = await request.json();

    await prisma.greeting.create({
      data: {
        text,
      },
    });

    return NextResponse.json({ message: 'Success' });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong:  ' + e },
      { status: 500 }
    );
  }
}
