import 'express-async-errors';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { NotFoundError } from './errors/not-found-error';
import { currentUser, errorHandler } from './middlewares';
import { JWT_KEY } from './utils';
import { routes } from './routes';

let app: Express;

const init = () => {
  app = express();

  // Configurations
  app.set('trust proxy', true);
  app.use(cookieParser());
  app.use(json());
  app.use(currentUser(JWT_KEY));
  app.use(urlencoded({ extended: true }));

  // Comunicação com o front
  app.use(cors());

  // Rotas a aplicação
  app.use('/api', routes);

  // Not Found
  app.all('*', async (req) => {
    console.log('NOT FOUND: ', req.url);
    throw new NotFoundError();
  });

  // deve ser o ultimo a ser adc
  app.use(errorHandler);
};

export { app, init };
