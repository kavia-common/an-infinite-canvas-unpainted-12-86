import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders help page by default redirect to login for protected routes', () => {
  render(
    <MemoryRouter initialEntries={['/help']}>
      <App />
    </MemoryRouter>
  );
  const helpText = screen.getByText(/Help & Documentation/i);
  expect(helpText).toBeInTheDocument();
});

test('login page renders', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  const signIn = screen.getByText(/Sign in/i);
  expect(signIn).toBeInTheDocument();
});
