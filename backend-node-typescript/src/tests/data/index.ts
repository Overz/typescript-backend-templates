import { demoData } from './demoData';

type Data = 'demo';

/**
 * Utiliza mocks em runtime dos testes
 *
 * @param data Mock
 */
export const useData = async (...data: Data[]) => {
  for (const d of data) {
    switch (d) {
      case 'demo':
        await demoData();
        continue;
    }
  }
};
