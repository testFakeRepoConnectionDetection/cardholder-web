import axios from 'axios';
import { config } from '../config';

/** Card fees (replacement card, express delivery) are paid through the hosted checkout. */
export async function createFeeCheckout(customerId: string, amountCents: number, reference: string) {
  const { data } = await axios.post(`${config.CHECKOUT_URL}/checkout/sessions`, {
    merchantAccount: 'CARDS-FEES-EU',
    amount: { value: amountCents, currency: 'EUR' },
    reference,
    shopperReference: customerId,
    returnUrl: 'https://cardholder.eu.bank.example/fees/return',
  });
  return data.redirectUrl as string;
}
