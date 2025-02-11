import axios, { AxiosError, AxiosResponse } from 'axios';
import { createChat } from './create-chat';
import { createContact } from './create-contact';

const accessToken: string | undefined = process.env.MY_TOKEN;

export interface Contact {
  id: string;
}

export async function getContact(
  number: string,
  name: string,
  message: string
): Promise<string> {
  try {
    const contactResponse: AxiosResponse<Contact> = await axios.get(
      `${process.env.BASE_URL}/contacts/number/${number}`,
      {
        headers: {
          'access-token': accessToken,
        },
      }
    );

    return contactResponse.data.id;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const axiosError: AxiosError = e;

      if (axiosError.response) {
        const contactId = await createContact(number, name);
        if (contactId) {
          createChat(contactId, number, message);
          return contactId;
        }
      }
    }

    throw new Error('Unknown');
  }
}
