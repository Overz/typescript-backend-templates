import React, { useState } from 'react';
import { useEffect } from 'react';
import { Loading } from '~/components/loading';
import { TestNavigation } from './test.routes';

export const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? <Loading centered /> : <TestNavigation />;
};
