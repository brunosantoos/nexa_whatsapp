import { CreateChatData } from "@/functions/create-chat";
import { formatFirstName } from "@/functions/format-first-name";
import { replacePlaceholders } from "@/functions/replace-place-holders";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/prismaClient";
import { LeadSession } from "@/types/session";
import { shuffle } from "@/utils/array";
import { formatPhone } from "@/utils/format-phone";
import { Greeting } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params: { message },
  }: {
    params: { message: string };
  },
): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "not logged in" }, { status: 401 });
    }

    const admin = await prisma.admin.findFirst({
      where: { email: session.user.email },
    });

    if (!admin) {
      return NextResponse.json({ message: "not logged in" }, { status: 401 });
    }

    const body: LeadSession = await request.json();

    const instanceDetails = await prisma.tokenId.findUnique({
      where: { idToken: body.instance },
    });

    if (!instanceDetails) {
      throw new Error("Instance not found");
    }

    const lead = await prisma.segmentation.findUnique({
      where: { id: body.idSegmentation },
      include: {
        contacts: {
          select: {
            phone: true,
            name: true,
          },
        },
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    if (admin.messageRemaining <= 0) {
      return NextResponse.json({ message: "No credits" }, { status: 401 });
    }

    let messagesSent = 0;

    for (const contact of lead.contacts) {
      if (admin.messageRemaining === 0) {
        return NextResponse.json(
          {
            message: `Credits exhausted after sending ${messagesSent} messages.`,
          },
          { status: 402 },
        );
      }

      const phone = formatPhone(contact.phone);
      const greeting: Greeting[] = await prisma.$queryRaw`
        (SELECT * FROM "greetings" ORDER BY RANDOM() LIMIT 1)
      `;

      const { text } = greeting[0];

      const textMessage = await prisma.messages.findMany({
        where: { slug: message },
        include: {
          image: {
            select: { mine: true },
          },
        },
      });

      const { content, haveMedia, mediaUrl, image } = shuffle(textMessage);

      const replacements: Record<string, string> = {
        nome: formatFirstName(contact.name),
      };

      const textCreate = `${text}\n\n${content}`;
      const textSend = replacePlaceholders(textCreate, replacements);

      const createNewChatData: CreateChatData = {
        number: phone,
        text: textSend,
      };

      let response: Response;

      if (haveMedia) {
        response = await fetch(
          `https://evo-api.brunosantos.cloud/message/sendMedia/${instanceDetails.name}`,
          {
            method: "POST",
            headers: {
              apiKey: instanceDetails.idToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              number: phone,
              mediatype: "image",
              media: mediaUrl,
              caption: textSend,
              mediaMessage: {
                mediaType: image?.mine,
              },
            }),
          },
        );
      } else {
        response = await fetch(
          `https://evo-api.brunosantos.cloud/message/sendText/${instanceDetails.name}`,
          {
            method: "POST",
            headers: {
              apiKey: instanceDetails.idToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(createNewChatData),
          },
        );
      }

      if (response.ok) {
        await prisma.reportSend.create({
          data: {
            message: textSend,
            adminId: admin.id,
            phone: phone,
          },
        });

        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            messageRemaining: { decrement: 1 },
            messageSend: { increment: 1 },
          },
        });

        messagesSent++;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, parseInt(body.selectedInterval)),
      );
    }

    return NextResponse.json({ message, lead, messagesSent });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong:  " + e },
      { status: 500 },
    );
  }
}
