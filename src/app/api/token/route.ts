import createInstance from "@/actions/create-instancia";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return NextResponse.json({ message: "not logged in" }, { status: 401 });
  }
  try {
    const { name, idToken } = await request.json();

    await createInstance({
      name,
      idToken,
    });

    return NextResponse.json({ message: "Success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong:  " + e },
      { status: 500 },
    );
  }
}
