import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

function setAuth(role = 'viewer') {
  const mock = {
    token: 't',
    user: { id: 'u', name: 'User', email: `${role}@example.com`, role }
  };
  window.localStorage.setItem('blu_auth', JSON.stringify(mock));
}

beforeEach(() => {
  window.localStorage.clear();
});

test('when unauthenticated, only Help and Sign in are visible in sidebar', () => {
  render(
    <MemoryRouter initialEntries={['/help']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Sign in/i })).toBeInTheDocument();
  // Home should not be visible before auth
  expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
});

test('viewer sees Home, Reports, Settings, Help', async () => {
  setAuth('viewer');
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Reports' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument();
  // Editor-only links hidden
  expect(screen.queryByRole('link', { name: 'Ideation' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Media' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Campaigns' })).not.toBeInTheDocument();
});

test('editor sees Ideation, Media, Campaigns in addition to viewer routes', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByRole('link', { name: 'Ideation' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Media' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Campaigns' })).toBeInTheDocument();
});
