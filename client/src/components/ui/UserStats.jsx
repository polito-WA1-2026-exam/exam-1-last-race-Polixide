import { Card, Row, Col } from 'react-bootstrap';
import { TrophyFill, BarChartFill, Controller, GraphUp, ClockHistory } from 'react-bootstrap-icons';

function UserStats({ user, stats, rank }) {
  // One stat tile (icon + value + label)
  const StatTile = ({ icon, value, label }) => (
    <Col xs={6} md={4} className="text-center mb-3">
      <div className="lr-rk-stat-icon mx-auto mb-2">{icon}</div>
      <div className="lr-rk-stat-value text-white">{value}</div>
      <div className="lr-muted small">{label}</div>
    </Col>
  );

  // Format the last played date (or a dash if never played)
  const lastPlayed = stats.last_played
    ? new Date(stats.last_played).toLocaleDateString()
    : '—';

  return (
    <Card className="lr-rk-stats-card mt-5">
      <Card.Body className="p-4">
        <h2 className="h4 text-white mb-4">Your Stats</h2>
        <Row className="g-0 justify-content-center">
          <StatTile icon={<TrophyFill size={26} className="lr-rk-gold" />}
                    value={user.best_score ?? 0} label="Best Score" />
          <StatTile icon={<BarChartFill size={26} className="text-primary" />}
                    value={rank > 0 ? `#${rank}` : 'N/A'} label="Current Rank" />
          <StatTile icon={<Controller size={26} className="text-primary" />}
                    value={stats.games_played} label="Games Played" />
          <StatTile icon={<GraphUp size={26} className="text-primary" />}
                    value={stats.avg_score} label="Average Score" />
          <StatTile icon={<ClockHistory size={26} className="text-primary" />}
                    value={lastPlayed} label="Last Played" />
        </Row>
      </Card.Body>
    </Card>
  );
}

export { UserStats };