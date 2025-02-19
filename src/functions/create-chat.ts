import axios from "axios";

const accessToken: string | undefined =
  process.env.MY_TOKEN || "A57919A889B6-4E4E-A61A-3927FD63CDD6";

export interface CreateChatData {
  number: string;
  text: string;
}

interface ErrorResponse {
  status: string;
}

export async function createChat(
  number: string,
  message: string,
): Promise<void> {
  try {
    const createNewChatData: CreateChatData = {
      number: number,
      text: message,
    };

    const response = await fetch(
      `http://localhost:8080/message/sendText/Teste`,
      {
        method: "POST",
        headers: {
          apiKey: accessToken || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createNewChatData),
      },
    );

    console.log("Response: ", await response.json());

    return;
  } catch (e) {
    console.error("An error occurred:", e);

    if (axios.isAxiosError(e)) {
    }

    throw new Error("Unknown");
  }
}
