import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { ClockHistory, GeoAlt, Flag, ArrowRight, Trash, SendFill, Trash2 } from 'react-bootstrap-icons';
import MetroMap from './MetroMap.jsx';

function PlanningPhase({ networkData, game, onSubmitted }) {

    const [timeLeft, setTimeLeft] = useState(90);
    const [submitted, setSubmitted] = useState(false);
    const [selectedSegments, setSelectedSegments] = useState([]);
    const [usedSegmentIds, setUsedSegmentIds] = useState(new Set());

    //countdown
    useEffect(() => {
        if (submitted || timeLeft === 0) return;
        const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timeLeft, submitted]);


    const mins = Math.floor(timeLeft / 60);
    const secs = String(timeLeft % 60).padStart(2, '0');
    const timerClass =
        timeLeft > 60 ? 'text-success' :
        timeLeft > 30 ? 'text-warning' : 'text-danger';

    return (
        <div>
            {/*Header*/}
            <Card className="lr-rk-card mb-4">
                <Card.Body className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h1 className="lr-rk-title text-white mb-0 fs-3">Planning Phase</h1>
                        <div className="d-flex align-items-center gap-2 px-3 py-2 lr-timer-badge">
                            <ClockHistory size={22} className={timerClass} />
                            <span className={`lr-timer-display ${timerClass}`}>{mins}:{secs}</span>
                        </div>
                    </div>

                    <Row className="g-3">
                        <Col xs={6}>
                            <div className="lr-station-card lr-station-card--start p-3 rounded-3 d-flex align-items-center gap-3">
                                <GeoAlt size={22} className="text-success flex-shrink-0" />
                                <div>
                                    <div className="lr-muted small">Start</div>
                                    <div className="text-white fw-semibold fs-5">{game?.startStation?.name}</div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="lr-station-card lr-station-card--dest p-3 rounded-3 d-flex align-items-center gap-3">
                                <Flag size={22} className="text-primary flex-shrink-0" />
                                <div>
                                    <div className="lr-muted small">Destination</div>
                                    <div className="text-white fw-semibold fs-5">{game?.destStation?.name}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/*Network Map without lines*/}
            <Row className="g-4 mb-4">
                <Col xs={12}>
                    <Card className="lr-rk-card">
                        <Card.Body className="p-3">
                            <div className="h6 text-white mb-1">
                                Network Map
                                <span className="lr-muted fw-normal small ms-2">(lines hidden)</span>
                            </div>
                            <MetroMap
                                stations={networkData?.stations}
                                segments={networkData?.segments}
                                showLines={false}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            
        </div>
    );
}

export { PlanningPhase };

