import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import {
    TrophyFill, ArrowRepeat, BarChartFill, StarFill, LightbulbFill, XCircleFill,
    Trophy
} from 'react-bootstrap-icons';
import { UserStats } from './UserStats.jsx';
import { getUserStats, getRanking } from '../../api/game.js';

function ResultPhase({ executionData, onNewGame }) {

    const { valid, finalScore , steps, invalidReason } = executionData ?? {};

    const [stats, setStats] = useState(null);
    const [rank, setRank] = useState(0);

    useEffect(() => {
        Promise.all([getUserStats(), getRanking()])
            .then(([statsData, rankingData]) => {
                setStats(statsData);
                const best = statsData.best_score ?? 0;
                setRank(best > 0 ? rankingData.filter(u => u.best_score > best).length + 1 : 0);
            })
            .catch(() => {});
    }, []);

    const segmentsCount = steps.length;
    const isNewBest = valid && finalScore > 0 && stats !== null && finalScore === stats.best_score;

    return (
        <div className="py-2">

            {/*Hero*/}
            <div className="text-center mb-4">
                <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                        width: 96, height: 96,
                        background: valid ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)',
                    }}
                >
                    {valid
                        ? <TrophyFill size={44} className="text-warning" />
                        : <XCircleFill size={44} className="text-danger" />
                    }
                </div>
                <h1 className="lr-rk-title text-white mb-1 fs-2">Game Complete!</h1>
                <p className="lr-muted mb-0">
                    {valid
                        ? `You travelled ${segmentsCount} segment${segmentsCount !== 1 ? 's' : ''} to reach your destination`
                        : (invalidReason ?? 'Your route was incomplete or invalid')}
                </p>
            </div>

            

            {/*Score card*/}
            <Card className={`lr-result-score-card mb-4 ${finalScore > 0 ? 'lr-result-score-card--success' : 'lr-result-score-card--zero'}`}>
                <Card.Body className="p-4 text-center">
                    <div className="lr-muted small text-uppercase mb-3" style={{ letterSpacing: '0.08em' }}>
                        Final Score
                    </div>
                    <div className={`lr-result-score mb-2 ${finalScore > 0 ? 'text-success' : 'lr-muted'}`}>
                        {finalScore}
                    </div>
                    <div className="lr-muted">coins</div>
                    
                </Card.Body>
            </Card>
            
            {/*New Personal Best banner*/}
            {isNewBest && (
                <Alert className="lr-result-best-banner d-flex align-items-center gap-2 mb-4" role="status">
                    <StarFill size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-semibold">New Personal Best!</span>
                    <span className="fw-normal opacity-75 ms-1">You broke your previous record.</span>
                </Alert>
            )}

            {/*User stats*/}
            {stats && <UserStats stats={stats} rank={rank} />}

            {/*Actions*/}
            <Row className="g-3 mt-4">
                <Col xs={6}>
                    <Button
                        className="lr-btn-primary d-flex align-items-center justify-content-center gap-2 w-100 py-3"
                        onClick={onNewGame}
                    >
                        <ArrowRepeat size={18} /> Play Again
                    </Button>
                </Col>
                <Col xs={6}>
                    <Link
                        to="/rankings"
                        className="btn lr-btn-amber d-flex align-items-center justify-content-center gap-2 w-100 py-3"
                    >
                        <Trophy size={16} /> View Rankings
                    </Link>
                </Col>
            </Row>

        
        </div>
    );
}

export { ResultPhase };
