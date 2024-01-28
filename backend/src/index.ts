import express from 'express';
import { config } from './config';
import apiRouter from './routers';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.listen(config.PORT, () => {
    console.log(`listening on ${config.PORT}`);
});
