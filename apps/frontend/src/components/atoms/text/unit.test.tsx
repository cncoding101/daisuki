import Text from '@components/atoms/text';
import { render, screen } from '@testing-library/react';

const text = 'hello world!';
describe('Text', () => {
  it('should render h1 with variant main', () => {
    render(<Text variant='main'>{text}</Text>);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(text);
  });

  it('should render h2 with variant secondary', () => {
    render(<Text variant='secondary'>{text}</Text>);

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(text);
  });

  it('should render h3 with variant tertiary', () => {
    render(<Text variant='tertiary'>{text}</Text>);

    const heading = screen.getByRole('heading', { level: 3 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(text);
  });
});
