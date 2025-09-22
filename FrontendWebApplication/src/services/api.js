const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

// Simple wrapper. Replace fetch calls with real endpoints when backend is ready.
async function request(path, { method = 'GET', body, token, headers = {} } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  const res = await fetch(`${API_BASE}${path}`, opts);
  const contentType = res.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const msg = typeof payload === 'string' ? payload : (payload?.message || 'Request failed');
    throw new Error(msg);
  }
  return payload;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns current API base URL from env. */
  return API_BASE;
}
