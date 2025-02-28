import type { ReactNode } from 'react';
import '@components/atoms/button/style.css';

type Variant = keyof typeof BUTTON_TYPES;

const BUTTON_TYPES = {
  primary: 'primary',
} as const;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({ children, variant, className = '', disabled = false, ...rest }) => {
  switch (variant) {
    case BUTTON_TYPES.primary:
      return (
        <button disabled={disabled} className={`btn ${className} ${disabled ? 'opacity-50' : ''}`} {...rest}>
          {children}
        </button>
      );

    default:
      return (
        <button disabled={disabled} className={`${className} ${disabled ? 'opacity-50' : ''}`} {...rest}>
          {children}
        </button>
      );
  }
};

export default Button;
