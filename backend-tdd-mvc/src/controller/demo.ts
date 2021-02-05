import { Request, Response } from 'express';
import { demoRepository } from '../models';
import { exibirDemoView, listarDemoView } from '../view/demo-view';

export default {
  async criar(req: Request, res: Response) {
    res.send(exibirDemoView(await demoRepository.save(req.body)));
  },
  async alterar(req: Request, res: Response) {
    const { id } = req.params;
    const { nome } = req.body;

    const demo = await demoRepository.count({ where: { cdDemo: id } });

    if (demo <= 0) {
      return res.status(400).send({ error: 'Nenhum dado encontrado!' });
    }

    await demoRepository.update({ cdDemo: Number(id) }, { nmNome: nome });

    res.status(204).send();
  },
  async listar(req: Request, res: Response) {
    res.send(listarDemoView(await demoRepository.find()));
  },
  async exibir(req: Request, res: Response) {
    const { id } = req.params;
    res.send(exibirDemoView(await demoRepository.findOne(Number(id))));
  },
  async deletar(req: Request, res: Response) {
    const { id } = req.params;

    await demoRepository.delete(Number(id));

    res.send({ ok: true });
  },
};
