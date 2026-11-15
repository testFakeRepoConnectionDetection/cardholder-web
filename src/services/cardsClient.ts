import axios from 'axios';
import { config } from '../config';

const http = axios.create({ baseURL: `${config.ISSUING_API_URL}/api/v2`, timeout: 5000 });

export interface CardSummary {
  cardId: string;
  maskedPan: string;
  status: 'ACTIVE' | 'BLOCKED' | 'PENDING_ACTIVATION';
  productCode: string;
}

export async function listCards(customerId: string): Promise<CardSummary[]> {
  const { data } = await http.get(`/customers/${customerId}/cards`);
  return data.items;
}

export async function activateCard(cardId: string, lastFourDigits: string): Promise<void> {
  await http.post(`/cards/${cardId}/activation`, { lastFourDigits });
}
