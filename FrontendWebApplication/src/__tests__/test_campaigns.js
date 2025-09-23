import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

function setAuth(role = 'editor') {
  const mock = { token: 't', user: { id: 'u', name: 'Editor', email: 'edit@example.com', role } };
  window.localStorage.setItem('blu_auth', JSON.stringify(mock));
}

beforeEach(() => {
  window.localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('platform toggles reduce compliant assets', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/campaigns']}>
      <App />
    </MemoryRouter>
  );

  // Initially meta and tiktok enabled; some compliant assets listed
  const platformsHeader = await screen.findByText(/Platforms/i);
  expect(platformsHeader).toBeInTheDocument();

  // Disable Meta and TikTok, enable only YouTube
  const metaCheckbox = screen.getByLabelText(/Meta/i, { selector: 'input[type="checkbox"]' });
  const tiktokCheckbox = screen.getByLabelText(/Tiktok/i, { selector: 'input[type="checkbox"]' });
  const youtubeCheckbox = screen.getByLabelText(/Youtube/i, { selector: 'input[type="checkbox"]' });

  fireEvent.click(metaCheckbox);   // uncheck meta
  fireEvent.click(tiktokCheckbox); // uncheck tiktok
  if (!youtubeCheckbox.checked) {
    fireEvent.click(youtubeCheckbox); // ensure youtube checked
  }

  // With only youtube, compliant assets (seed has a1 youtube warn; a2 ok; a3 ok) -> a2 and a3
  expect(await screen.findByText(/hero-banner\.jpg/i)).toBeInTheDocument();
  expect(screen.getByText(/brand_story_30s\.mp4/i)).toBeInTheDocument();
});

test('launch without selecting assets shows danger status', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/campaigns']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(await screen.findByRole('button', { name: /Launch Campaign/i }));
  expect(await screen.findByText(/No assets selected/i)).toBeInTheDocument();
});

test('launch with selected assets shows success status after delay', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/campaigns']}>
      <App />
    </MemoryRouter>
  );

  // Ensure at least one checkbox exists and select it
  const firstCheckbox = (await screen.findAllByRole('checkbox')).find(el => el.closest('label')?.textContent && el.closest('label')?.textContent !== '');
  if (firstCheckbox) {
    fireEvent.click(firstCheckbox);
  }

  fireEvent.click(screen.getByRole('button', { name: /Launch Campaign/i }));
  // advance mock timers to pass the artificial delay (800ms)
  await waitFor(() => {
    jest.advanceTimersByTime(900);
  });

  // Success messages appear
  expect(await screen.findByText(/Launched to:/i)).toBeInTheDocument();
  expect(screen.getByText(/Assets:/i)).toBeInTheDocument();
});
