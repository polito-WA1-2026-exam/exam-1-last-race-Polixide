import { useContext } from 'react';
import { Link } from 'react-router';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import {TrainFront, PlayCircle, Trophy, BookHalf, ArrowRight, Clock, Coin, QuestionCircle} from 'react-bootstrap-icons';
import { AuthContext } from '../../contexts/AuthContext';
import MetroAnimation from '../ui/MetroAnimation';


function HomePage() {
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;

  return (
    <Container style={{ maxWidth: '1140px' }} className="py-5">

      {/* ===== Hero Section ===== */}
      <div className="text-center mb-5">
        <div className="lr-icon-circle mb-3">
          <TrainFront className="text-primary" size={48} />
        </div>
        <h1 className="display-3 fw-bold text-white mb-3">Last Race</h1>
        <p className="lead lr-text mx-auto" style={{ maxWidth: '640px' }}>
          Navigate the underground metro network, plan your route wisely, and race
          against time to reach your destination with the highest score!
        </p>
      </div>

      {/* ===== Hero Animation ===== */}
      <div className="mb-5 rounded-4 overflow-hidden shadow-lg">
        <MetroAnimation />
      </div>

      {/* ===== Quick Actions ===== */}
      <Row className="g-4 mb-5">
        {isAuthenticated ? (
          <>
            <Col md={6}>
              <Card as={Link} to="/game" className="lr-action-card text-white text-decoration-none h-100"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                <Card.Body className="p-4">
                  <PlayCircle size={48} className="mb-3" />
                  <h2 className="h3 fw-bold mb-2">Start New Game</h2>
                  <p className="mb-4" style={{ color: '#dbeafe' }}>
                    Challenge yourself with a new route and beat your best score!
                  </p>
                  <div className="d-flex align-items-center fw-medium">
                    Play Now <ArrowRight size={20} className="ms-2" />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card as={Link} to="/rankings" className="lr-action-card text-white text-decoration-none h-100"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                <Card.Body className="p-4">
                  <Trophy size={48} className="mb-3" />
                  <h2 className="h3 fw-bold mb-2">View Rankings</h2>
                  <p className="mb-4" style={{ color: '#fef3c7' }}>
                    See how you rank against other players!
                  </p>
                  {user?.bestScore > 0 && (
                    <div className="fw-medium mb-2">Your Best: {user.bestScore} coins</div>
                  )}
                  <div className="d-flex align-items-center fw-medium">
                    View Leaderboard <ArrowRight size={20} className="ms-2" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : (
          <>
            <Col md={6}>
              <Card as={Link} to="/login" className="lr-action-card text-white text-decoration-none h-100"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                <Card.Body className="p-4">
                  <PlayCircle size={48} className="mb-3" />
                  <h2 className="h3 fw-bold mb-2">Login to Play</h2>
                  <p className="mb-4" style={{ color: '#dbeafe' }}>
                    Sign in to start playing and compete on the leaderboard!
                  </p>
                  <div className="d-flex align-items-center fw-medium">
                    Login Now <ArrowRight size={20} className="ms-2" />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card as={Link} to="/instructions" className="lr-action-card text-white text-decoration-none h-100"
                    style={{ background: 'linear-gradient(135deg, #475569, #334155)' }}>
                <Card.Body className="p-4">
                  <BookHalf size={48} className="mb-3" />
                  <h2 className="h3 fw-bold mb-2">How to Play</h2>
                  <p className="mb-4" style={{ color: '#e2e8f0' }}>
                    Learn the rules and strategies to master the game!
                  </p>
                  <div className="d-flex align-items-center fw-medium">
                    Read Instructions <ArrowRight size={20} className="ms-2" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {/* ===== Game Features ===== */}
      <Card className="lr-card">
        <Card.Body className="p-4">
          <h2 className="h3 fw-bold text-white text-center mb-4">Game Features</h2>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="lr-feature-circle bg-primary bg-opacity-10 mb-3">
                <TrainFront className="text-primary" size={32} />
              </div>
              <h3 className="h5 fw-semibold text-white mb-2">Complex Network</h3>
              <p className="small lr-muted">
                Navigate through multiple metro lines with interchange stations
              </p>
            </Col>

            <Col md={4} className="text-center">
              <div className="lr-feature-circle bg-warning bg-opacity-10 mb-3">
                <Clock className="text-warning" size={32} />
              </div>
              <h3 className="h5 fw-semibold text-white mb-2">Time Challenge</h3>
              <p className="small lr-muted">
                Plan your route in 90 seconds before the timer runs out
              </p>
            </Col>

            <Col md={4} className="text-center">
              <div className="lr-feature-circle bg-success bg-opacity-10 mb-3">
                <QuestionCircle className="text-success" size={32} />
              </div>
              <h3 className="h5 fw-semibold text-white mb-2">Random Events</h3>
              <p className="small lr-muted">
                Encounter unexpected events that affect your coin score
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </Container>
  );
}

export {HomePage};