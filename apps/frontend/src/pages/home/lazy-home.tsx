import Loading from '@components/organisms/loading';
import { Suspense } from 'react';
import lazyWithPreload from 'react-lazy-with-preload';

// being explicit here with index name, to avoid potential issues with inferring bundle chunk name
export const LazyHomeComponent = lazyWithPreload(() => import('./index'));

export const LazyHome = () => {
  return (
    <Suspense fallback={<Loading ariaLabel='loading home page..' />}>
      <LazyHomeComponent />
    </Suspense>
  );
};
