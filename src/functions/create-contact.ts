import axios, { AxiosError, AxiosResponse } from 'axios';

const accessToken: string | undefined = process.env.MY_TOKEN;

interface ContactInfo {
  nickName: string;
  number: string;
}

export async function createContact(
  name: string,
  number: string
): Promise<string | undefined> {
  try {
    const contactInfo: ContactInfo = {
      nickName: name,
      number,
    };

    const contactCreate: AxiosResponse = await axios.post(
      `${process.env.BASE_URL}/contacts`,
      contactInfo,
      {
        headers: {
          'access-token': accessToken,
        },
      }
    );

    if (contactCreate.status === 201) {
      const contact: AxiosResponse = await axios.get(
        `${process.env.BASE_URL}/contacts/number/${number}`,
        {
          headers: {
            'access-token': accessToken,
          },
        }
      );

      const contactData: any = contact.data;

      if (contactData && contactData.id) {
        return contactData.id;
      } else {
        throw new Error('Contact ID not found in response.');
      }
    } else {
      throw new Error(
        'Contact creation failed with status code: ' + contactCreate.status
      );
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const axiosError: AxiosError = e;
      const responseData: unknown = axiosError.response?.data;

      if (
        typeof responseData === 'object' &&
        responseData &&
        'status' in responseData &&
        (responseData as any).status === '400'
      ) {
        return 'Contact already exists';
      }
    }

    return undefined;
  }
}
