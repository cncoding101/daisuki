import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const Link: React.FC<IProps> = ({ to, children, className }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default Link;
