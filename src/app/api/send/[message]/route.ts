import { sendMessage } from "@/actions/send-message";
import { formatFirstName } from "@/functions/format-first-name";
import { replacePlaceholders } from "@/functions/replace-place-holders";
import prisma from "@/lib/prisma/prismaClient";
import { Leads } from "@/types/lead";
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
    const lead: Leads = await request.json();

    if (!lead || !Array.isArray(lead.leads) || lead.leads.length === 0) {
      return NextResponse.json({ error: "Invalid Parameter" }, { status: 400 });
    }

    for (const leadItem of lead.leads) {
      if (!leadItem.personal_phone || !leadItem.name) {
        return NextResponse.json(
          { error: "Invalid Parameter" },
          { status: 400 },
        );
      }

      try {
        const phone = formatPhone(leadItem.personal_phone);

        const greeting: Greeting[] = await prisma.$queryRaw`
          (SELECT * FROM "greetings" ORDER BY RANDOM() LIMIT 1)
        `;

        const status = await prisma.status.findUnique({
          where: {
            id: 1,
          },
        });

        if (status?.status === false) {
          return NextResponse.json(
            { Error: "Integração desligada" },
            { status: 400 },
          );
        }

        const { text } = greeting[0];

        const textMessage = await prisma.messages.findMany({
          where: {
            slug: message,
          },
        });

        const { content } = shuffle(textMessage);

        const replacements: Record<string, string> = {
          nome: formatFirstName(leadItem.name),
        };

        const textCreate = `${text}\n\n${content}`;

        const textSend = replacePlaceholders(textCreate, replacements);

        await prisma.reportSend.create({
          data: {
            message: textSend,
            phone,
          },
        });

        sendMessage(phone, textSend, leadItem.name);

        await new Promise((resolve) => {
          setTimeout(resolve, 15000);
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
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
