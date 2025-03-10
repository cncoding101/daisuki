import Icon from '@components/atoms/icon';
import React from 'react';

interface IProps {
  className?: 'animate-spin' | 'animate-bounce' | 'animate-pulse' | 'animate-bounce-pulse';
  icon: React.ComponentProps<typeof Icon>;
}

const IconAnimation: React.FC<IProps> = ({ className = 'animate-spin', icon }) => {
  return (
    <div className={className}>
      <Icon {...icon} />
    </div>
  );
};

export default IconAnimation;
