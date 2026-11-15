import { Router } from 'express';
import { readControls, setControl } from '../services/controlsClient';

export const controlsRouter = Router();

controlsRouter.get('/:cardId', async (req, res) => res.json(await readControls(req.params.cardId)));

controlsRouter.put('/:cardId/:control', async (req, res) => {
  await setControl(req.params.cardId, req.params.control.toUpperCase() as never, Boolean(req.body.enabled));
  res.status(204).end();
});
