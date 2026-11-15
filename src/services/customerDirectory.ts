import { Client } from 'ldapts';
import { config } from '../config';

/** Reads the customer's verified mobile number before sending a one-time password. */
export async function findMobileNumber(customerId: string): Promise<string | undefined> {
  const client = new Client({ url: config.DIRECTORY_URL, timeout: 2000 });
  try {
    await client.bind(process.env.DIRECTORY_BIND_DN ?? '', process.env.DIRECTORY_BIND_PASSWORD ?? '');
    const { searchEntries } = await client.search(config.DIRECTORY_BASE_DN, {
      filter: `(customerNumber=${customerId})`,
      attributes: ['mobile'],
    });
    return searchEntries[0]?.mobile as string | undefined;
  } finally {
    await client.unbind();
  }
}
