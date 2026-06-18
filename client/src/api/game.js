const SERVER_URL = 'http://localhost:3001/api';

// Get the global leaderboard 
const getRanking = async () => {
  const res = await fetch(`${SERVER_URL}/users/ranking`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  return res.json();
}

export { getRanking };