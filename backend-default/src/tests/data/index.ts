import { demoData } from './demoData';

type Data = 'demo';

export const useData = async (...data: Data[]) => {
  for (const d of data) {
    switch (d) {
      case 'demo':
        await demoData();
        break;
    }
  }
};
