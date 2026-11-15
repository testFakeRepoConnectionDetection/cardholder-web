import { Router } from 'express';
import { createFeeCheckout } from '../services/checkoutClient';
import { verifyAddress } from '../services/addressCheck';

export const feesRouter = Router();

feesRouter.post('/replacement', async (req, res) => {
  const { line1, postcode, country } = req.body.deliveryAddress;
  if (!(await verifyAddress(line1, postcode, country))) {
    res.status(422).json({ error: 'UNDELIVERABLE_ADDRESS' });
    return;
  }
  res.json({ redirectUrl: await createFeeCheckout(String(req.header('x-customer-id')), 1500, req.body.cardId) });
});
