import {
  atualizarDemoRouter,
  criarDemoRouter,
  exibirRouterDemo,
  listarDemoRouter,
  excluirDemoRouter,
} from './routes/demo';

const demo = [
  criarDemoRouter,
  atualizarDemoRouter,
  exibirRouterDemo,
  listarDemoRouter,
  excluirDemoRouter,
];

export const routes = [...demo];
