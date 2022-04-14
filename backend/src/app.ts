import Knex from 'knex';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import { Model, knexSnakeCaseMappers } from 'objection';

import router from './routes';
import knexConfig from '../knexfile';
import bodyParser from 'body-parser';
import compression from 'compression';
import json from './middlewares/json';
import { logger, stream } from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '8000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

// Initialize knex.
const knex = Knex({
  ...knexConfig,
  ...knexSnakeCaseMappers()
});

// Bind all Models to a knex instance.
Model.knex(knex);

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream }));
app.use('*/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(json);

// API Routes
app.use('/', router);

// Error Middlewares
app.use(errorHandler.errorHandler);
app.use(errorHandler.methodNotFound);

app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started at http://${app.get('host')}:${app.get('port')}/`);
});
