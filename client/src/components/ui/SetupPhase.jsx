import { useMemo } from 'react';
import { Card, Row, Col, Button, Badge, Spinner } from 'react-bootstrap';
import { PlayCircle, GeoAlt, Diagram3, Signpost2, CashCoin, InfoCircle } from 'react-bootstrap-icons';
import MetroMap from './MetroMap.jsx';

function SetupPhase({ networkData, onReady }) {

    const interchanges = networkData?.stations.filter(s => s.isInterchange);

    if (!networkData) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading…</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div>
            <div className="text-center mb-4">
                <h1 className="lr-rk-title text-white mb-3">Setup Phase</h1>
                <p className="lr-muted fs-5">
                    Study the metro network carefully before starting your journey
                </p>
            </div>

            <Card className="lr-rk-card mb-4">
                <Card.Body className="p-4 d-flex align-items-start gap-3">
                    <GeoAlt size={26} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="h5 text-white mb-2">Metro Network</h2>
                        <p className="lr-muted mb-0">
                            Memorize the station connections, metro lines, and interchange stations.
                            In the next phase you will plan your route{' '}
                            <strong className="text-white">without seeing the lines</strong>.
                        </p>
                    </div>
                </Card.Body>
            </Card>

            <Row className="g-3 mb-4">
                <Col md={3} xs={6}>
                    <Card className="lr-rk-card h-100 text-center">
                        <Card.Body className="p-3">
                            <Diagram3 size={24} className="text-primary mb-2" />
                            <div className="lr-rk-stat-value text-white">{networkData.lines.length}</div>
                            <div className="lr-muted small">Lines</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3} xs={6}>
                    <Card className="lr-rk-card h-100 text-center">
                        <Card.Body className="p-3">
                            <GeoAlt size={24} className="text-primary mb-2" />
                            <div className="lr-rk-stat-value text-white">{networkData.stations.length}</div>
                            <div className="lr-muted small">Stations</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3} xs={6}>
                    <Card className="lr-rk-card h-100 text-center">
                        <Card.Body className="p-3">
                            <Signpost2 size={24} className="text-primary mb-2" />
                            <div className="lr-rk-stat-value text-white">{interchanges.length}</div>
                            <div className="lr-muted small">Interchanges</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3} xs={6}>
                    <Card className="lr-rk-card h-100 text-center">
                        <Card.Body className="p-3">
                            <CashCoin size={24} className="lr-rk-gold mb-2" />
                            <div className="lr-rk-stat-value text-white">20</div>
                            <div className="lr-muted small">Starting coins</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="g-3 mb-4">
                <Col md={7}>
                    <Card className="lr-rk-card h-100">
                        <Card.Body className="p-4">
                            <h2 className="h6 text-white mb-3">Lines</h2>
                            <div className="d-flex flex-column gap-2">
                                {networkData.lines.map(line => (
                                    <div key={line.id} className="d-flex align-items-center gap-2">
                                        <span
                                            className="d-inline-block rounded-circle"
                                            style={{ width: 14, height: 14, backgroundColor: line.color }}
                                        />
                                        <span className="text-white">{line.name} Line</span>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={5}>
                    <Card className="lr-rk-card h-100">
                        <Card.Body className="p-4">
                            <h2 className="h6 text-white mb-3">
                                Interchange stations <InfoCircle size={14} className="lr-muted" />
                            </h2>
                            <div className="d-flex flex-wrap gap-2">
                                {interchanges.map(s => (
                                    <Badge key={s.id} bg="primary" className="fw-normal">
                                        {s.name}
                                    </Badge>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="lr-rk-card mb-4">
                <Card.Body className="p-3">
                    <MetroMap
                        stations={networkData.stations}
                        segments={networkData.segments}
                        showLines={true}
                    />
                </Card.Body>
            </Card>

            <div className="text-center">
                <Button
                    className="lr-btn-primary d-inline-flex align-items-center gap-2 px-5 py-3 fs-5"
                    onClick={onReady}
                >
                    <PlayCircle size={24} />
                    <span>Start Planning Phase</span>
                </Button>
                <p className="lr-muted small mt-3">
                    You will have 90 seconds to plan your route
                </p>
            </div>
        </div>
    );
}

export { SetupPhase };
