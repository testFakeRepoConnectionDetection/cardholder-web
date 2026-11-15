import express from 'express';
import { config } from './config';
import { cardsRouter } from './routes/cards';
import { controlsRouter } from './routes/controls';
import { pinRouter } from './routes/pin';
import { feesRouter } from './routes/fees';
import { hooksRouter } from './routes/hooks';

const app = express();
app.use(express.json());
app.use('/api/cards', cardsRouter);
app.use('/api/controls', controlsRouter);
app.use('/api/pin', pinRouter);
app.use('/api/fees', feesRouter);
app.use('/hooks', hooksRouter);

app.listen(config.PORT, () => console.log(`cardholder-web listening on ${config.PORT}`));
