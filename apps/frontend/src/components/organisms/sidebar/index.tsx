import Button from '@components/atoms/button';
import Icon from '@components/atoms/icon';
import LoginForm from '@components/organisms/form/login';

import '@components/organisms/sidebar/style.css';
import { useEffect, useRef } from 'react';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<IProps> = ({ open, setOpen }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((o) => !o);
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (open && ref.current != null && !ref.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, setOpen, open]);

  return (
    <div ref={ref} className={`sidebar ${open ? 'open' : ''}`}>
      <Button className='close' onClick={handleToggle}>
        <Icon variant={{ type: 'io', icon: 'close' }} />
      </Button>

      <section className='container my-6'>
        <LoginForm />
      </section>
    </div>
  );
};

export default SideBar;
