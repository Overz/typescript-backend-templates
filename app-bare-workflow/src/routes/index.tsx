import React, { useState } from 'react';
import { useEffect } from 'react';
import { Loading } from '~/components/loading';
import { StackNavigation } from './stack.routes';
import { DrawerNavigation } from './drawer.routes';

export const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? <Loading centered /> : <DrawerNavigation />;
  return loading ? <Loading centered /> : <StackNavigation />;
};
