import { Demo } from '../models';

export const exibirDemoView = (demo?: Demo) => {
  return {
    id: demo?.cdDemo,
    nome: demo?.nmNome,
    descricao: demo?.deDescricao,
  };
};

export const listarDemoView = (demo?: Demo[]) => {
  return demo?.map((d) => exibirDemoView(d));
};
