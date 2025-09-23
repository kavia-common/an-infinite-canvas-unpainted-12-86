import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  // ensure no previous auth persisted
  window.localStorage.clear();
});

test('renders help page content when visiting /help', () => {
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

test('unauthenticated user visiting /home is redirected to login', async () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );
  // ProtectedRoute should navigate to /login
  await waitFor(() => {
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
