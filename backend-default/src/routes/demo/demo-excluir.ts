import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { demoRepository } from '~/models';

const router = Router();

router.delete('/demo/:cdDemo', async (req: Request, res: Response) => {
  await demoRepository.delete(req.params.cdDemo);

  res.sendStatus(200);
});

export { router as excluirDemoRouter };
