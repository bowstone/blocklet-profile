import fallback from '@blocklet/sdk/lib/middlewares/fallback';
import { BizStatusCode, IResponseData } from '@types';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv-flow';
import express, { ErrorRequestHandler } from 'express';
import 'express-async-errors';
import { rateLimit } from 'express-rate-limit';
import path from 'path';

import { logger } from './libs';
import './repository';
import routes from './routes';

dotenv.config();

const { name, version } = require('../../package.json');

export const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json({ limit: '1 mb' }));
app.use(express.urlencoded({ extended: true, limit: '1 mb' }));
app.use(cors());

// 限流
app.use(
  rateLimit({
    windowMs: 3 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    // store: ... , // Redis, Memcached, etc. See below.
  }),
);
const router = express.Router();
router.use('/api', routes);
app.use(router);

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

if (isProduction) {
  const staticDir = path.resolve(process.env.BLOCKLET_APP_DIR!, 'dist');
  app.use(express.static(staticDir, { maxAge: '30d', index: false }));
  app.use(fallback('index.html', { root: staticDir }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err, _req, res, _next) => {
  logger.error(err.stack);
  res.status(500).send({
    code: BizStatusCode.ServiceError,
    message: '服务异常，请稍后重试',
    data: null,
  } as IResponseData);
}) as ErrorRequestHandler);
const port = parseInt(process.env.BLOCKLET_PORT!, 10);

export const server = app.listen(port, (err?: any) => {
  if (err) throw err;
  logger.info(`> ${name} v${version} ready on ${port}`);
});
