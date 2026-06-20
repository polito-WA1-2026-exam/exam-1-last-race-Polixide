const SERVER_URL = 'http://localhost:3001/api';

const getRanking = async () => {
    const res = await fetch(`${SERVER_URL}/users/ranking`, { credentials: 'include' });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
};

const getUserStats = async () => {
    const res = await fetch(`${SERVER_URL}/games/stats`, { credentials: 'include' });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
};

const getNetwork = async () => {
    const res = await fetch(`${SERVER_URL}/network`, { credentials: 'include' });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
};

const createGame = async () => {
    const res = await fetch(`${SERVER_URL}/games`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
};


export { getRanking, getUserStats, getNetwork, createGame };
