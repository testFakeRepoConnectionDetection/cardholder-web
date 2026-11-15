import axios from 'axios';
import { config } from '../config';

const http = axios.create({ baseURL: config.CARD_CONTROLS_URL, timeout: 3000 });

export type ControlName = 'ONLINE' | 'CONTACTLESS' | 'ABROAD' | 'FREEZE';

export async function readControls(cardId: string): Promise<Record<ControlName, boolean>> {
  const { data } = await http.get(`/controls/v1/cards/${cardId}`);
  return data.controls;
}

export async function setControl(cardId: string, control: ControlName, enabled: boolean) {
  await http.put(`/controls/v1/cards/${cardId}/${control.toLowerCase()}`, { enabled });
}
