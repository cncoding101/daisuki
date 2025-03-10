import Button from '@components/atoms/button';
import Icon from '@components/atoms/icon';
import Link from '@components/atoms/link';
import Logo from '@components/atoms/logo';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  logo: React.ComponentProps<typeof Logo>;
  menu?: {
    main: { to: string; label: string }[];
    side?: { to: string; icon: React.ComponentProps<typeof Icon> }[];
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<IProps> = ({ logo, menu = { main: [] }, setOpen }) => {
  const currentPath = useLocation();

  return (
    <nav className='relative px-5 py-3'>
      <ul className='flex w-full justify-center space-x-4'>
        {menu.main.map((link, index) => {
          return (
            <div key={index} className='flex items-center space-x-4'>
              {Math.round(menu.main.length / 2) === index && <Logo {...logo} />}
              <li key={index}>
                <Link
                  className={`${currentPath.key === link.to ? 'text-highlight' : 'white'} hover:text-highlight transition-colors`}
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            </div>
          );
        })}
      </ul>

      <ul className='absolute right-5 top-1/2 flex -translate-y-1/2 transform items-center space-x-6'>
        <Button onClick={() => setOpen(true)}>
          <Icon variant={{ type: 'fa', icon: 'user' }} size={25} />
        </Button>

        {menu.side != null &&
          menu.side.map((link, index) => (
            <li key={index}>
              <Link
                className={`${currentPath.key === link.to ? 'text-secondary' : 'white'} hover:text-secondary transition-colors`}
                to={link.to}
              >
                <Icon {...link.icon} />
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
