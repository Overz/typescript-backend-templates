import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { demoRepository } from '~/models';

const router = Router();

router.get('/demo', async (req: Request, res: Response) => {
  res.send(await demoRepository.findAndCount());
});

export { router as listarDemoRouter };
