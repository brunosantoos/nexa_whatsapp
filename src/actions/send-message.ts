import axios, { AxiosError } from "axios";
import { createChat } from "../functions/create-chat";

interface ErrorResponse {
  status: string;
}

export async function sendMessage(
  number: string,
  message: string,
): Promise<void> {
  try {
    console.log("Sending message to", number);

    createChat(number, message);
  } catch (e) {
    console.error("An error occurred:", e);

    if (axios.isAxiosError(e)) {
      const axiosError: AxiosError<ErrorResponse> = e;

      if (axiosError.response?.data.status === "400") {
        try {
          console.log("Creating something...");
        } catch (innerError) {
          console.error("Failed to create something:", innerError);
        }
      } else {
        console.error("HTTP Status Code:", axiosError.response?.status);
      }
    }
  }
}
