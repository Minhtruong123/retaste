/* eslint-disable no-console */
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import env from './configs/environments';
import cors from 'cors';
import corsOptions from './configs/cors';
import './configs/database';
import { errorHandling } from './middlewares/errorsHandle.middleware';
import { indexRoute } from './routers';
import https from 'https';
import fs from 'fs';
import path from 'path';

// import { connectRedis } from './configs/redis';
import 'dotenv/config';
const API_V1 = '/api/v1';
const app = express();

// init middleware
app.use(helmet());
app.use(compression());
app.use(morgan(env.BUILD_MODE));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_V1, indexRoute);

app.use(errorHandling);

const certPath = path.join(__dirname, '..', 'mkcert-pem');

const httpsOptions = {
  key: fs.readFileSync(path.join(certPath, 'localhost+2-key.pem')),
  cert: fs.readFileSync(path.join(certPath, 'localhost+2.pem'))
};

https.createServer(httpsOptions, app).listen(env.APP_PORT, env.APP_HOST, () => {
  console.log(`App is running on https://${env.APP_HOST}:${env.APP_PORT} !`);
});
