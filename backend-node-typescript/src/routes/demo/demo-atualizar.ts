import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors';
import { validateRequest } from '../../middlewares';
import { demoRepository } from '../../models';

const router = Router();

router.put(
  '/demo/:cdDemo',
  [
    body('descricao')
      .optional()
      .notEmpty()
      .isString()
      .withMessage('Descricao informada incompativel'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
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
  }
);

export { router as atualizarDemoRouter };
