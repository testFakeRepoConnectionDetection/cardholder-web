import { Router } from 'express';
import { activateCard, listCards } from '../services/cardsClient';

export const cardsRouter = Router();

cardsRouter.get('/', async (req, res) => {
  res.json(await listCards(String(req.header('x-customer-id'))));
});

cardsRouter.post('/:cardId/activate', async (req, res) => {
  await activateCard(req.params.cardId, req.body.lastFourDigits);
  res.status(204).end();
});
