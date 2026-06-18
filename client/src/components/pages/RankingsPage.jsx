import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Container, Card, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import { TrophyFill, Award, AwardFill, ArrowLeft } from 'react-bootstrap-icons';
import { AuthContext } from '../../contexts/AuthContext.js';
import * as gameApi from '../../api/game.js';

function RankingsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load the ranking from the server on mount.
  useEffect(() => {
    gameApi.getRanking()
      .then((data) => setRankings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Icon for the top three positions, plain number otherwise.
  const getRankIcon = (rank) => {
    if (rank === 1) return <TrophyFill size={24} className="lr-rk-gold" />;
    if (rank === 2) return <Award size={24} className="lr-rk-silver" />;
    if (rank === 3) return <AwardFill size={24} className="lr-rk-bronze" />;
    return <span className="lr-rk-num">#{rank}</span>;
  };

  // Extra class for the top three cards.
  const getRankClass = (rank) => {
    if (rank === 1) return 'lr-rk-card-gold';
    if (rank === 2) return 'lr-rk-card-silver';
    if (rank === 3) return 'lr-rk-card-bronze';
    return '';
  };

  return (
    <Container className="py-4" style={{ maxWidth: '880px' }}>

      <Button variant="link" className="lr-rk-back-btn px-0 mb-4" onClick={() => navigate(-1)}>
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
                <Card
                  key={u.id}
                  className={`lr-rk-card ${getRankClass(rank)} ${isCurrentUser ? 'lr-rk-card-me' : ''}`}
                >
                  <Card.Body>
                    <Row className="align-items-center g-0">
                      {/* Rank icon */}
                      <Col xs="auto" className="lr-rk-icon-col text-center">
                        {getRankIcon(rank)}
                      </Col>

                      {/* Username + You badge */}
                      <Col className="d-flex align-items-center gap-2 ps-3">
                        <span className="lr-rk-name">{u.username}</span>
                        {isCurrentUser && <Badge bg="primary">You</Badge>}
                      </Col>

                      {/* Score */}
                      <Col xs="auto" className="text-end">
                        <div className="lr-rk-score">{u.best_score}</div>
                        <div className="lr-muted small">coins</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )
      )}

    </Container>
  );
}

export {RankingsPage};