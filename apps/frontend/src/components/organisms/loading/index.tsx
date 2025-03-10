import IconAnimation from '@components/molecules/icon-animation';

interface IProps {
  ariaLabel: string;
}

const Loading: React.FC<IProps> = ({ ariaLabel }) => {
  return (
    <div aria-label={ariaLabel} className='flex h-full items-center justify-center'>
      <IconAnimation className='animate-bounce-pulse' icon={{ variant: { type: 'gi', icon: 'spacesuit' }, size: 75 }} />
    </div>
  );
};

export default Loading;
