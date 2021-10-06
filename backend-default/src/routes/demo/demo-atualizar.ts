import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors';
import { demoRepository } from '../../models';

const router = Router();

router.put('/demo/:cdDemo', async (req: Request, res: Response) => {
  const { descricao } = req.body;
  const demo = await demoRepository.findOne(req.params.cdDemo);
  if (!demo) {
    throw new BadRequestError('Demo não encontrado');
  }

  if (descricao) {
    demo.deDescricao = descricao;
  }

  await demoRepository.save(demo);

  res.sendStatus(204);
});

export { router as atualizarDemoRouter };
