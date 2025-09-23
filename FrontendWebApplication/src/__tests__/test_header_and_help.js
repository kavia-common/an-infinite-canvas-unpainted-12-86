import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.setAttribute('data-theme', 'light');
});

function setAuth() {
  const mock = { token: 't', user: { id: 'u', name: 'Alex Morgan', email: 'viewer@example.com', role: 'viewer' } };
  window.localStorage.setItem('blu_auth', JSON.stringify(mock));
}

test('header theme toggle updates aria-label text', async () => {
  setAuth();
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );
  const toggle = await screen.findByRole('button', { name: /Switch to dark theme/i });
  fireEvent.click(toggle);
  // text should flip to light theme prompt
  expect(screen.getByRole('button', { name: /Switch to light theme/i })).toBeInTheDocument();
});

test('help page displays API base URL', () => {
  render(
    <MemoryRouter initialEntries={['/help']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/API Base:/i)).toBeInTheDocument();
});
