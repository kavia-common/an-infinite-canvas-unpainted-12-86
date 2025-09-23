import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

// Utility to set a mock authenticated user in localStorage
function setAuth(role = 'viewer', email = 'viewer@example.com', name = 'Viewer V') {
  const mock = {
    token: 'mock-token',
    user: { id: 'u_1', name, email, role }
  };
  window.localStorage.setItem('blu_auth', JSON.stringify(mock));
}

beforeEach(() => {
  window.localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('ProtectedRoute denies access to /ideation for viewer role', async () => {
  setAuth('viewer');
  render(
    <MemoryRouter initialEntries={['/ideation']}>
      <App />
    </MemoryRouter>
  );
  // Should render access denied card
  expect(await screen.findByText(/Access denied/i)).toBeInTheDocument();
  expect(screen.getByText(/does not have permission/i)).toBeInTheDocument();
});

test('ProtectedRoute allows /reports for viewer', async () => {
  setAuth('viewer');
  render(
    <MemoryRouter initialEntries={['/reports']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Reporting & Analytics/i)).toBeInTheDocument();
});

test('Login flow sets role based on email and redirects to /home', async () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  // Fill email for editor role
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'edit@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

  // After login, the app should navigate to /home and show Dashboard content
  expect(await screen.findByText(/Brand & Creative People/i)).toBeInTheDocument();
  // header should show signed in user pill
  expect(screen.getByText(/Signed in as/i)).toBeInTheDocument();
});

test('Logout from sidebar clears auth and shows Sign in button', async () => {
  setAuth('editor', 'edit@example.com', 'Eddie Editor');
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );

  // Ensure dashboard visible
  expect(await screen.findByText(/Brand & Creative People/i)).toBeInTheDocument();
  // Click logout
  fireEvent.click(screen.getByRole('button', { name: /Log out/i }));
  // Sidebar should show Sign in link
  expect(await screen.findByRole('link', { name: /Log in/i })).toBeInTheDocument();
});
