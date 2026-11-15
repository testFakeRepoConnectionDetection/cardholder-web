import { Router } from 'express';
import { randomInt } from 'crypto';
import { sendOtp } from '../services/otpPublisher';
import { findMobileNumber } from '../services/customerDirectory';

export const pinRouter = Router();

pinRouter.post('/reveal/challenge', async (req, res) => {
  const customerId = String(req.header('x-customer-id'));
  if (!(await findMobileNumber(customerId))) {
    res.status(409).json({ error: 'NO_VERIFIED_MOBILE' });
    return;
  }
  await sendOtp(customerId, String(randomInt(0, 999999)).padStart(6, '0'));
  res.status(202).end();
});
