import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import Demo from './controller/demo';
import cors from 'cors';

const app = express();

// Configurations
app.set('trust proxy', true);
app.use(cookieParser(/*env.get('JWT_KEY').required(true).asString()*/));
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

// Rotas a aplicação

// Demo
app.post('/api/demo', Demo.criar);
app.put('/api/demo/:id', Demo.alterar);
app.get('/api/demo', Demo.listar);
app.get('/api/demo/:id', Demo.exibir);
app.delete('/api/demo/:id', Demo.deletar);

// Not Found
app.all('*', async (req, res) => {
  return res.status(400).send('Not found');
});

export { app };
