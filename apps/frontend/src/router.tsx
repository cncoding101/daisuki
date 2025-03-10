import Authenticate from '@components/organisms/authenticate';
import DefaultLayout from '@components/templates/default-layout';
import { LazyHome } from '@pages/home/lazy-home';

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const routes = createRoutesFromElements(
  <Route
    element={
      <Authenticate>
        <DefaultLayout />
      </Authenticate>
    }
    path='/*'
  >
    <Route element={<LazyHome />} path='home'></Route>
  </Route>,
);

const router = createBrowserRouter(routes);

export default router;
