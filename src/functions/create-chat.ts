import axios, { AxiosError } from 'axios';
import { sendText } from './send-text';

const accessToken: string | undefined = process.env.MY_TOKEN;

interface CreateChatData {
  contactId: string;
  number: string;
  sectorId: string;
  message: string;
}

interface ErrorResponse {
  status: string;
}

export async function createChat(
  contactId: string,
  number: string,
  message: string
): Promise<void> {
  try {
    const createNewChatData: CreateChatData = {
      contactId,
      number,
      sectorId: '5fbfb126fafaaa2b49fc1d65',
      message,
    };

    await axios.post(
      `${process.env.BASE_URL}/chats/create-new`,
      createNewChatData,
      {
        headers: {
          'access-token': accessToken,
        },
      }
    );

    return;
  } catch (e) {
    console.error('An error occurred:', e);

    if (axios.isAxiosError(e)) {
      const axiosError: AxiosError<ErrorResponse> = e;

      if (axiosError.response?.data.status === '400') {
        console.log('Creating contact...');
        sendText(message, number);
        return;
      }
    }

    throw new Error('Unknown');
  }
}
