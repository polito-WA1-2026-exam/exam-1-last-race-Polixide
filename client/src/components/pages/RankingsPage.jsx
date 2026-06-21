import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Container, Card, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import { TrophyFill, Award, AwardFill, ArrowLeft } from 'react-bootstrap-icons';
import { AuthContext } from '../../contexts/AuthContext.js';
import { UserCardRanking } from '../ui/UserCardRanking.jsx';
import { UserStats } from '../ui/UserStats.jsx';
import * as gameApi from '../../api/game.js';

function RankingsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [rankings, setRankings] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load the ranking from the server on mount.
  useEffect(() => {
    Promise.all([gameApi.getRanking(), gameApi.getUserStats()])
      .then(([ranking, stats]) => {
        setRankings(ranking);
        setUserStats(stats)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);


  return (
    <Container className="py-4" style={{ maxWidth: '880px' }}>

      <Button variant="link" className="lr-rk-back-btn px-0 mb-4" onClick={() => navigate('/game')}>
        <ArrowLeft size={20} className="me-2" />
        <span>Back</span>
      </Button>

      {/* Header */}
      <div className="text-center mb-5">
        <div className="lr-rk-icon-circle mx-auto mb-3">
          <TrophyFill size={56} className="lr-rk-gold" />
        </div>
        <h1 className="lr-rk-title mb-3">Rankings</h1>
        <p className="lr-muted fs-4">Top players by best score</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <Card className="lr-rk-card">
          <Card.Body className="text-center lr-muted py-5">{error}</Card.Body>
        </Card>
      )}

      {/* Leaderboard */}
      {!loading && !error && (
        rankings.length === 0 ? (
          <Card className="lr-rk-card">
            <Card.Body className="text-center lr-muted py-5">
              No scores yet. Be the first to complete a game!
            </Card.Body>
          </Card>
        ) : (
          <div className="d-flex flex-column gap-3">
            {rankings.map((u, index) => {
              const rank = index + 1;
              const isCurrentUser = user && u.id === user.id;
              return (
                <UserCardRanking key={u.id} user={u} rank={rank} isCurrentUser={isCurrentUser} />
              );
            })}
          </div>
        )
      )}

      {/* Current user stats */}
      {!loading && !error && userStats && (
        <UserStats
          stats={userStats}
          rank={rankings.findIndex((u) => u.id === user.id) + 1}
        />
      )}

    </Container>
  );
}

export { RankingsPage };