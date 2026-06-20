import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { ClockHistory, GeoAlt, Flag, ArrowRight, Trash, SendFill, Trash2, XCircleFill, ArrowLeftRight } from 'react-bootstrap-icons';
import MetroMap from './MetroMap.jsx';

function PlanningPhase({ networkData, game, onSubmitted }) {

    const [timeLeft, setTimeLeft] = useState(9000);
    const [submitted, setSubmitted] = useState(false);
    const [selectedSegments, setSelectedSegments] = useState([]);

    //countdown
    useEffect(() => {
        if (submitted || timeLeft === 0) return;
        const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timeLeft, submitted]);

    useEffect(() => {
        if (timeLeft === 0 && !submitted) {
            setSubmitted(true);
            onSubmitted(selectedSegments.map(s => s.id));
        }

    }, [timeLeft, submitted]);

    const handleSelectSegment = (seg) => {

        setSelectedSegments(prev => [...prev, seg]);

    };

    const handleRemoveSegment = (index) => {

        if (submitted) return;

        const seg = selectedSegments[index];
        setSelectedSegments(prev => prev.filter((_, i) => i !== index));

    };

    const handleManualSubmit = () => {

        if (submitted) return;

        setSubmitted(true);
        onSubmitted(selectedSegments.map(s => s.id));
    };

    const mins = Math.floor(timeLeft / 60);
    const secs = String(timeLeft % 60).padStart(2, '0');
    const timerClass = timeLeft > 60 ? 'text-success' : (timeLeft > 30 ? 'text-warning' : 'text-danger');

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
                            <div className="d-flex align-items-baseline gap-2 mb-4">
                                <h2 className="lr-planning-section-title mb-0">Network Map</h2>
                                <span className="lr-planning-section-hint">(lines hidden)</span>
                            </div>
                            <MetroMap
                                stations={networkData?.stations}
                                segments={networkData?.segments}
                                height={320}
                                showLines={false}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/*Available segments*/}
            <Row className="g-4 mb-4">
                <Col xs={12}>
                    <Card className="lr-rk-card">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-baseline gap-2 mb-4">
                                <h2 className="lr-planning-section-title mb-0">Available Segments</h2>
                                <span className="lr-planning-section-hint">(Click to add to route)</span>
                            </div>

                            <div className="lr-planning-segment-list">
                                {networkData?.segments.map((seg) => {

                                    const usedSegmentIds = new Set(selectedSegments.map(s => s.id));
                                    const used = usedSegmentIds.has(seg.id);

                                    return (
                                        <Button
                                            key={seg.id}
                                            variant="link"
                                            className={`lr-planning-segment-btn ${used ? 'lr-planning-segment-btn--used' : ''}`}
                                            onClick={() => handleSelectSegment(seg)}
                                            disabled={used || submitted}
                                        >
                                            <div className="lr-planning-segment-inner">
                                                <div className="lr-planning-segment-main">
                                                    <span className="lr-planning-station-name">{seg.fromName}</span>
                                                    <ArrowLeftRight size={16} className="lr-planning-segment-icon" />
                                                    <span className="lr-planning-station-name">{seg.toName}</span>
                                                </div>

                                                {used && (
                                                    <span className="lr-planning-used-label">Used</span>
                                                )}
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Selected route */}
            <Row className="g-4">
                <Col xs={12}>
                    <Card className="lr-rk-card">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="d-flex align-items-baseline gap-2">
                                    <h2 className="lr-planning-section-title mb-0">Your Route</h2>
                                    <span className="lr-planning-section-hint">
                                        ({selectedSegments.length} segments)
                                    </span>
                                </div>

                                <Button
                                    className="lr-planning-submit-btn d-inline-flex align-items-center gap-2"
                                    onClick={handleManualSubmit}
                                    disabled={submitted}
                                >
                                    <SendFill size={18} />
                                    <span>{submitted ? 'Submitted' : 'Submit Route'}</span>
                                </Button>
                            </div>

                            {selectedSegments.length === 0 ? (
                                <p className="lr-planning-empty mb-0">
                                    No segments selected yet. Click segments from the list to build your route.
                                </p>
                            ) : (
                                <div className="lr-planning-route-list">
                                    {selectedSegments.map((segment, index) => (
                                        <div key={`${segment.id}-${index}`} className="lr-planning-route-item">
                                            <div className="lr-planning-route-index">
                                                {index + 1}
                                            </div>

                                            <div className="lr-planning-route-path">
                                                <span className="text-white">{segment.fromName}</span>
                                                <ArrowRight size={16} className="lr-muted" />
                                                <span className="text-white">{segment.toName}</span>
                                            </div>

                                            <Button
                                                variant="link"
                                                className="lr-planning-remove-btn"
                                                onClick={() => handleRemoveSegment(index)}
                                                disabled={submitted}
                                            >
                                                <XCircleFill size={24} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    );
}

export { PlanningPhase };

