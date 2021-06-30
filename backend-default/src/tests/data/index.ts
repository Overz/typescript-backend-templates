import { demoData } from './demoData';

export const useData = async (name: string) => {
  name.includes('demo') && (await demoData());
};
