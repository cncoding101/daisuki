import { createBrowserRouter } from 'react-router-dom';

import Home from '@pages/home';
import DefaultLayout from '@components/templates/default-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
]);

export default router;
