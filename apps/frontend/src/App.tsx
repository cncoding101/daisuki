import { config } from '@config/environment';
import '@styles/global.css';
import { getHeadInfoForPath } from '@utils/helpers/header-info';
import { NoProps } from '@utils/types';
import React, { StrictMode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'router';
import store from './store';

const App: React.FC<NoProps> = () => {
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

export default App;
