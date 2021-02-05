import { demoRepository } from '../../models';

export const demoData = async () => {
  await demoRepository.save({
    cdDemo: 1,
    deDescricao: 'description',
    nmNome: 'demo name',
  });
};
