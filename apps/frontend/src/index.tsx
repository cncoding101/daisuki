import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'router';
import store from './store';

import '@styles/global.css';
import { NoProps } from '@utils/types';
import { getHeadInfoForPath } from '@utils/helpers/header-info';
import { config } from '@config/environment';

const RootComponent: React.FC<NoProps> = () => {
  const defaultHeaderInfo = getHeadInfoForPath(config.urls.frontend);

  return (
    <StrictMode>
      <HelmetProvider>
        <Helmet>
          <title>{defaultHeaderInfo.title} 12312312</title>
          <meta content={defaultHeaderInfo.description} name='description' />
          <link href='logo_head.jpg' rel='icon' />
        </Helmet>

        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </HelmetProvider>
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RootComponent />);
