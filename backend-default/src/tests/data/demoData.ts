import { demoRepository, Status } from '../../models';

export const demoData = async () => {
  await demoRepository.save({
    cdDemo: '1',
    deDescricao: 'descricao',
    flStatus: Status.ATIVO,
  });
};
