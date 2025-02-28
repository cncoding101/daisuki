import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import InputField from '@components/molecules/input-field';
import Form from '@components/organisms/form';

import '@components/organisms/form/login/style.css';

const LoginForm = () => {
  const handleSubmit = () => {};

  return (
    <Form onSubmit={handleSubmit}>
      <InputField label='Email Address' />
      <InputField label='Password' />

      <Button className='my-2 w-full' variant='primary' type='submit'>
        Log in
      </Button>

      <Button className='my-2 w-full bg-black' variant='primary'>
        Create account
      </Button>

      <Link to='' className='text-primary underline'>
        Forgot password
      </Link>
    </Form>
  );
};

export default LoginForm;
