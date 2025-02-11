import axios, { AxiosError, AxiosResponse } from 'axios';

const accessToken: string | undefined = process.env.MY_TOKEN;

interface SendData {
  forceSend: boolean;
  isWhisper: boolean;
  message: string;
  verifyContact: boolean;
  number: string;
}

export async function sendText(message: string, number: string): Promise<void> {
  const sendData: SendData = {
    forceSend: true,
    isWhisper: false,
    message,
    verifyContact: false,
    number,
  };

  try {
    const sendResponse: AxiosResponse | undefined = await axios.post(
      `${process.env.BASE_URL}/chats/send-text`,
      sendData,
      {
        headers: {
          'access-token': accessToken,
        },
      }
    );

    if (sendResponse) {
      const { currentChatId } = sendResponse.data;

      const bodyMessage = {
        sendMessageFinalized: false,
        fidelityUser: false,
        sendResearchSatisfaction: false,
      };

      await axios.post(
        `${process.env.BASE_URL}/chats/${currentChatId}/finalize`,
        bodyMessage,
        {
          headers: {
            'access-token': accessToken,
          },
        }
      );
    } else {
      throw new Error('No response received from the server.');
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      const axiosError: AxiosError = e;
      console.error('Axios error occurred:', axiosError.message);
    } else {
      console.error('Unknown error occurred:', e);
    }
  }
}
