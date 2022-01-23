import { Router, Request, Response } from 'express';
import { demoRepository } from '../../models';

const router = Router();

router.get('/demo', async (req: Request, res: Response) => {
  res.send(await demoRepository.findAndCount());
});

export { router as listarDemoRouter };
