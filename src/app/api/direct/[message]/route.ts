import { CreateChatData } from "@/functions/create-chat";
import { formatFirstName } from "@/functions/format-first-name";
import { replacePlaceholders } from "@/functions/replace-place-holders";
import prisma from "@/lib/prisma/prismaClient";
import { LeadSession } from "@/types/session";
import { shuffle } from "@/utils/array";
import { formatPhone } from "@/utils/format-phone";
import { Greeting } from "@prisma/client";
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
    const body: LeadSession = await request.json();

    const instanceDetails = await prisma.tokenId.findUnique({
      where: {
        idToken: body.instance,
      },
    });

    if (!instanceDetails) {
      throw new Error("Instance not found");
    }

    const lead = await prisma.segmentation.findUnique({
      where: {
        id: body.idSegmentation,
      },
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

    try {
      for (const contact of lead.contacts) {
        const phone = formatPhone(contact.phone);

        const greeting: Greeting[] = await prisma.$queryRaw`
        (SELECT * FROM "greetings" ORDER BY RANDOM() LIMIT 1)
      `;

        const { text } = greeting[0];

        const textMessage = await prisma.messages.findMany({
          where: {
            slug: message,
          },
        });

        const { content } = shuffle(textMessage);

        const replacements: Record<string, string> = {
          nome: formatFirstName(contact.name),
        };

        const textCreate = `${text}\n\n${content}`;

        const textSend = replacePlaceholders(textCreate, replacements);

        const createNewChatData: CreateChatData = {
          number: phone,
          text: textSend,
        };

        const response = await fetch(
          `${process.env.BASE_URL_EVO}message/sendText/${instanceDetails.name}`,
          {
            method: "POST",
            headers: {
              apiKey: instanceDetails.idToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(createNewChatData),
          },
        );

        console.log(await response.json());

        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    return NextResponse.json({ message, lead });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong:  " + e },
      { status: 500 },
    );
  }
}
