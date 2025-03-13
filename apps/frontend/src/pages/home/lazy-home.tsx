import Loading from '@components/organisms/loading';
import { Suspense } from 'react';
import lazyWithPreload from 'react-lazy-with-preload';

const simulateHomeLoad = new Promise<{ default: React.ComponentType<any> }>((resolve) => {
  setTimeout(() => resolve(import('./index')), 10000); // Simulating a 3 seconds delay
});

// being explicit here with index name, to avoid potential issues with inferring bundle chunk name
export const LazyHomeComponent = lazyWithPreload(() => simulateHomeLoad);

export const LazyHome = () => {
  return (
    <Suspense fallback={<Loading ariaLabel='loading home page..' />}>
      <LazyHomeComponent />
    </Suspense>
  );
};
