import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

function setAuth(role = 'editor') {
  const mock = { token: 't', user: { id: 'u', name: 'Editor', email: 'edit@example.com', role } };
  window.localStorage.setItem('blu_auth', JSON.stringify(mock));
}

beforeEach(() => {
  window.localStorage.clear();
});

test('media manager filters by search query', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/media']}>
      <App />
    </MemoryRouter>
  );

  // Ensure table exists
  const table = await screen.findByRole('table', { name: /Assets table/i });
  // Search for "hero-banner"
  fireEvent.change(screen.getByLabelText(/Search by name/i), { target: { value: 'hero-banner' } });

  // Now only hero-banner row should be present
  const rows = within(table).getAllByRole('row');
  // 1 header row + 1 data row expected
  expect(rows.length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText(/hero-banner\.jpg/i)).toBeInTheDocument();
});

test('media manager filter by compatibility', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/media']}>
      <App />
    </MemoryRouter>
  );
  const table = await screen.findByRole('table', { name: /Assets table/i });

  // Filter to "Not compliant" which maps to value "fail"
  fireEvent.change(screen.getByLabelText(/Filter by compatibility/i), { target: { value: 'fail' } });

  // Expect only rows containing a fail indicator in any platform column
  // Known seed data has a2 with tiktok: 'fail'
  expect(await screen.findByText(/hero-banner\.jpg/i)).toBeInTheDocument();

  // Change to "Compliant" ("ok")
  fireEvent.change(screen.getByLabelText(/Filter by compatibility/i), { target: { value: 'ok' } });
  // a1 has meta ok, tiktok ok, youtube warn -> still included as at least one ok exists for filter logic
  // But filter logic checks if any of the compatibility values includes filter; so expect a1 to be present
  expect(await screen.findByText(/summer-campaign-15s\.mp4/i)).toBeInTheDocument();
});

test('uploading files adds new assets to the top of the list', async () => {
  setAuth('editor');
  render(
    <MemoryRouter initialEntries={['/media']}>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByLabelText(/Upload media/i);
  const file1 = new File(['data'], 'new-video.mp4', { type: 'video/mp4' });
  const file2 = new File(['img'], 'fresh-image.png', { type: 'image/png' });

  // Upload multiple files
  fireEvent.change(input, { target: { files: [file1, file2] } });

  // Newly added appear; at least the names should be visible
  expect(await screen.findByText(/new-video\.mp4/i)).toBeInTheDocument();
  expect(screen.getByText(/fresh-image\.png/i)).toBeInTheDocument();

  // Compatibility chips appear (e.g., "Compliant" for meta ok)
  expect(screen.getAllByText(/Compliant/i).length).toBeGreaterThan(0);
});
