const SERVER_URL = 'http://localhost:3001/api';

// POST /api/sessions -> log in, returns the user object
const login = async (credentials) => {
  const res = await fetch(`${SERVER_URL}/sessions`, {
    method: 'POST',
    credentials: 'include', // send/receive the session cookie
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Wrong credentials');
  }
  return res.json();
};

// GET /api/sessions/current -> current user (or 401 if none)
const getCurrentUser = async () => {
  const res = await fetch(`${SERVER_URL}/sessions/current`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
};

// DELETE /api/sessions/current -> log out
const logout = async () => {
  const res = await fetch(`${SERVER_URL}/sessions/current`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Logout failed');
};

export { login, getCurrentUser, logout };