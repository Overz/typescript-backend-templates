import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError } from '~/errors/not-found-error';
import { demoRepository } from '~/models';

const router = Router();

router.get('/demo/:cdDemo', async (req: Request, res: Response) => {
  const demo = await demoRepository.findOne(req.params.cdDemo);

  if (!demo) {
    throw new NotFoundError();
  }

  res.send(demo);
});

export { router as exibirRouterDemo };
