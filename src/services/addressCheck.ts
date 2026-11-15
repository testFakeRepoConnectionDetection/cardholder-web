import axios from 'axios';
import { config } from '../config';

/** Validates the delivery address of a replacement card. */
export async function verifyAddress(line1: string, postcode: string, country: string) {
  const { data } = await axios.post(
    `${config.ADDRESS_CHECK_URL}/v1/verify`,
    { line1, postcode, country },
    { headers: { 'x-api-key': config.ADDRESS_CHECK_KEY ?? '' } },
  );
  return data.verdict === 'DELIVERABLE';
}
