import Input from '@components/atoms/input';
import Text from '@components/atoms/text';

interface IProps {
  label: string;
  input?: React.ComponentProps<typeof Input>;
}

const InputField: React.FC<IProps> = ({ label, input }) => {
  return (
    <div className='input-field'>
      <Text variant='label'>{label}</Text>
      <Input {...input} />
    </div>
  );
};

export default InputField;
