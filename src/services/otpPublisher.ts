import amqp from 'amqplib';
import { config } from '../config';

const EXCHANGE = 'cust.notify';
const ROUTING_KEY = 'otp.sms';

let channel: amqp.Channel | undefined;

async function openChannel(): Promise<amqp.Channel> {
  if (!channel) {
    const connection = await amqp.connect(config.AMQP_URL);
    channel = await connection.createChannel();
    await channel.checkExchange(EXCHANGE);
  }
  return channel;
}

/** Sends the one-time password used to reveal the PIN. */
export async function sendOtp(customerId: string, code: string): Promise<void> {
  const ch = await openChannel();
  ch.publish(EXCHANGE, ROUTING_KEY, Buffer.from(JSON.stringify({ customerId, code, ttlSeconds: 180 })), {
    persistent: true,
    contentType: 'application/json',
  });
}
