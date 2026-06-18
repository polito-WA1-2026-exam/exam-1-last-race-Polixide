import { Card, Row, Col } from 'react-bootstrap';
import { TrophyFill, BarChartFill, Controller, GraphUp, ClockHistory } from 'react-bootstrap-icons';
import dayjs from 'dayjs';

function UserStats({ stats, rank }) {
    // One stat tile (icon + value + label)
    const StatTile = ({ icon, value, label }) => (
        <Col md={4} className="lr-rk-stat text-center px-3">
            <div className="lr-rk-stat-icon mx-auto mb-2">{icon}</div>
            <div className="lr-rk-stat-value text-white">{value}</div>
            <div className="lr-muted small">{label}</div>
        </Col>
    );

    // Format the last played date (or a dash if never played)
    const lastPlayed = stats.last_played
        ? dayjs(stats.last_played).format('DD/MM/YYYY')
        : '—';

    return (
        <Card className="lr-rk-stats-card mt-5">
            <Card.Body className="p-4">
                <h2 className="h4 text-white mb-4">Your Stats</h2>

                {/* First row: 3 stats */}
                <Row className="align-items-start mb-4">
                    <StatTile icon={<TrophyFill size={26} className="lr-rk-gold" />}
                        value={stats.best_score ?? 0} label="Best Score" />
                    <StatTile icon={<BarChartFill size={26} className="text-primary" />}
                        value={rank > 0 ? `#${rank}` : 'N/A'} label="Current Rank" />
                    <StatTile icon={<Controller size={26} className="text-primary" />}
                        value={stats.games_played} label="Games Played" />
                </Row>

                {/* Second row: 2 stats, centered */}
                <Row className="align-items-start justify-content-center">
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