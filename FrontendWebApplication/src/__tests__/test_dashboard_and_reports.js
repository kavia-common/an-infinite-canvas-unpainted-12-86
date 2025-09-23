import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

function setAuth(role = 'viewer') {
  const mock = { token: 't', user: { id: 'u', name: 'User', email: 'user@example.com', role } };
  window.localStorage.setItem('blu_auth', JSON.stringify(mock));
}

beforeEach(() => {
  window.localStorage.clear();
});

test('dashboard shows key sections when authenticated', async () => {
  setAuth('viewer');
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Brand & Creative People/i)).toBeInTheDocument();
  expect(screen.getByText(/Attributes Summary/i)).toBeInTheDocument();
  expect(screen.getByText(/Content Over and Under Performers/i)).toBeInTheDocument();
});

test('reports shows metrics and attribute sections', async () => {
  setAuth('viewer');
  render(
    <MemoryRouter initialEntries={['/reports']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Reporting & Analytics/i)).toBeInTheDocument();
  expect(screen.getByText(/Attributes Summary/i)).toBeInTheDocument();
  expect(screen.getByText(/Content Over and Under Performers/i)).toBeInTheDocument();
});
