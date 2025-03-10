import Navbar from '@components/organisms/navbar';
import Sidebar from '@components/organisms/sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import '@components/templates/default-layout/style.css';

const defaultLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const navbar: React.ComponentProps<typeof Navbar> = {
    logo: {
      url: 'logo.png',
      width: 70,
      height: 70,
    },
    menu: {
      main: [
        {
          to: '/store',
          label: 'Store',
        },
        {
          to: '/about-me',
          label: 'About me',
        },
      ],
      side: [
        {
          to: '',
          icon: {
            variant: {
              type: 'fi',
              icon: 'cart',
            },
            size: 25,
          },
        },
      ],
    },
    setOpen: setOpen,
  };

  return (
    <div className='flex min-h-screen flex-col'>
      {/* overlay */}
      {open && <div className='fixed inset-0 bg-black opacity-50'></div>}

      <Navbar {...navbar} />

      <Sidebar open={open} setOpen={setOpen} />

      <main className='flex flex-grow overflow-auto'>
        <section className='container flex-grow'>
          <Outlet />
        </section>
      </main>

      <footer className='flex flex-shrink-0 justify-center'>© 2024 Daisuki. All Rights Reserved.</footer>
    </div>
  );
};

export default defaultLayout;
