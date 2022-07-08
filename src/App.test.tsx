import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const addEventListener = jest.spyOn(document, 'addEventListener');

jest.mock('uuid', () => ({
  v4: () => 'uuid_v4'
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('it renders', () => {
  const { container } = render(<App />);

  expect(container).toMatchSnapshot();
});

test('it increments (fireEvent)', () => {
  const { debug } = render(<App />);

  const button = screen.getByRole('button', { name: /increment/i });

  userEvent.click(button);
  userEvent.click(button);
  userEvent.click(button);

  // eslint-disable-next-line testing-library/no-debugging-utils
  debug();
});

test('id adds document click listener', async () => {
  render(<App />);

  await waitFor(() => {
    expect(addEventListener).toBeCalledTimes(2);
  });
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
