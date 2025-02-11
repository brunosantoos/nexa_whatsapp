import axios, { AxiosError } from 'axios';
import { createChat } from '../functions/create-chat';
import { getContact } from '../functions/get-contact';

interface ErrorResponse {
  status: string;
}

export async function sendMessage(
  number: string,
  message: string,
  name: string
): Promise<void> {
  try {
    console.log('Sending message to', number);

    const contactId: string | undefined = await getContact(
      number,
      name,
      message
    );

    if (contactId) {
      createChat(contactId, number, message);
    } else {
      console.error('Failed to create chat. Contact ID is missing.');
    }
  } catch (e) {
    console.error('An error occurred:', e);

    if (axios.isAxiosError(e)) {
      const axiosError: AxiosError<ErrorResponse> = e;

      if (axiosError.response?.data.status === '400') {
        try {
          console.log('Creating something...');
        } catch (innerError) {
          console.error('Failed to create something:', innerError);
        }
      } else {
        console.error('HTTP Status Code:', axiosError.response?.status);
      }
    }
  }
}
