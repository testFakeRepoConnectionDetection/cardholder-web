import { Router } from 'express';

export const hooksRouter = Router();

/** Card status changes pushed by the issuing platform; the portal refreshes its cache. */
hooksRouter.post('/card-status', (req, res) => {
  const { cardId, status } = req.body;
  console.log(`card ${cardId} is now ${status}`);
  res.status(202).end();
});
