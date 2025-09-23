import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

function setAuth(role = 'editor') {
  const mock = { token: 't', user: { id: 'u', name: 'Editor', email: 'edit@example.com', role } };
  window.localStorage.setItem('blu_auth', JSON.stringify(mock));
}

beforeEach(() => {
  window.localStorage.clear();
});

test('adding a new idea prepends it to the list', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/ideation']}>
      <App />
    </MemoryRouter>
  );

  const input = await screen.findByLabelText(/Add Idea/i);
  fireEvent.change(input, { target: { value: 'New Viral Concept' } });
  fireEvent.click(screen.getByRole('button', { name: /Add idea/i }));

  // Newly added idea is visible
  expect(await screen.findByText(/New Viral Concept/i)).toBeInTheDocument();
});
