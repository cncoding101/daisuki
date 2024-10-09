import { ReactNode } from 'react';

interface IProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode | ReactNode[];
}

const Form: React.FC<IProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
