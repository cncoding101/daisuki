import { Authenticate } from '@components/organisms/authenticate';
import DefaultLayout from '@components/templates/default-layout';
import Home from '@pages/home';

import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, useParams } from 'react-router-dom';


const routes = createRoutesFromElements(
  <Route
    element={
      <Authenticate>
        <DefaultLayout />
      </Authenticate>
    }
    path='/*'
  >
    <Route element={<Home />} path='home'></Route>
  </Route>,
);

const router = createBrowserRouter(routes);

export default router;
