import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { JournalText, Clock, CashCoin, GeoAltFill, CheckCircleFill, XCircleFill, ArrowRightShort, BookHalf, Coin, DashCircleFill } from 'react-bootstrap-icons';


function InstructionsPage() {
    const LINES = {
        mars: '#f43f5e',     // red
        jupiter: '#facc15',  // yellow
        earth: '#10b981',    // green
        neptune: '#3b82f6',  // blue
    };


    const DEMO_STATIONS = [
        { name: 'Vega', line: LINES.mars },
        { name: 'Orion', line: LINES.neptune },
        { name: 'Helios', line: LINES.earth },
        { name: 'Polaris', line: LINES.jupiter },
    ];

    const DEMO_EVENTS = [
        { text: 'Smooth ride, no delays', delta: 0 },
        { text: 'Found a lost wallet', delta: +5 },
        { text: 'Ticket inspection fine', delta: -3 },
        { text: 'Helped a tourist, got a tip', delta: +4 },
        { text: 'Train breakdown', delta: -6 },
    ];
    // running coin total for the demo, starting from the game's 20 coins
    let demoCoins = 20;

    return (
        <Container className="lr-instructions py-4" style={{ maxWidth: '960px' }}>

            {/* Header */}
            <div className="text-center mb-5">
                <div className="lr-icon-circle lr-icon-blue mx-auto mb-3">
                    <BookHalf size={48} />
                </div>
                <h1 className="lr-title mb-2">How to Play</h1>
                
            </div>

            {/* Game Objective */}
            <Card className="lr-card mb-4">
                <Card.Body className="p-4">
                    <h2 className="lr-subtitle mb-3">Game Objective</h2>
                    <p className="lr-muted fs-6 mb-0">
                        Navigate from a randomly assigned starting station to a destination station
                        through the underground metro network. Plan your route wisely within the time
                        limit, and accumulate coins by encountering random events during your journey.
                        The goal is to reach your destination with the highest possible score.
                    </p>
                </Card.Body>
            </Card>

            {/* Game Phases */}
            <Card className="lr-card mb-4">
                <Card.Body className="p-4">
                    <h2 className="lr-subtitle mb-4">Game Phases</h2>

                    {/* Phase 1 */}
                    <div className="d-flex gap-3 mb-4">
                        <div className="lr-step-circle lr-icon-blue">1</div>
                        <div>
                            <h3 className="lr-step-title">Setup Phase</h3>
                            <p className="lr-muted mb-2">
                                Study the complete metro network map showing all stations, their connections,
                                and the different metro lines. Familiarize yourself with interchange stations
                                where you can switch between lines.
                            </p>
                            <div className="d-flex align-items-center gap-2 lr-hint">
                                <GeoAltFill size={16} />
                                <span>You will see the full network map with all lines</span>
                            </div>
                        </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="d-flex gap-3 mb-4">
                        <div className="lr-step-circle lr-icon-amber">2</div>
                        <div>
                            <h3 className="lr-step-title">Planning Phase (90 seconds)</h3>
                            <p className="lr-muted mb-2">
                                You will be assigned a starting station and a destination station. The map now
                                shows only the station names without the connecting lines. You have 90 seconds
                                to mentally reconstruct the network and build your route by selecting segments
                                from a shuffled list.
                                The route must start at the starting station and end at the destination and each 
                                segment can only be selected once.
                            </p>
                        
                        </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="d-flex gap-3 mb-4">
                        <div className="lr-step-circle lr-icon-green">3</div>
                        <div>
                            <h3 className="lr-step-title">Execution Phase</h3>
                            <p className="lr-muted mb-2">
                                Your route is validated and you travel through each segment. Random events occur
                                at each step, affecting your coin total positively or negatively. Watch your score
                                change as you progress.
                            </p>
                            <div className="d-flex align-items-center gap-2 lr-hint">
                                <Coin size={16} className="text-warning" />
                                <span>Start with 20 coins, gain or lose coins through random events</span>
                            </div>
                        </div>
                    </div>

                    {/* Phase 4 */}
                    <div className="d-flex gap-3">
                        <div className="lr-step-circle lr-icon-violet">4</div>
                        <div>
                            <h3 className="lr-step-title">Result Phase</h3>
                            <p className="lr-muted mb-0">
                                View your final score and see your position on the leaderboard. You can start
                                a new game to try again.
                            </p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Mini demo: example route + events */}
            <Card className="lr-card mb-4">
                <Card.Body className="p-4">
                    <h2 className="lr-subtitle mb-2">Quick Demo</h2>
                    <p className="lr-muted mb-4">
                        A tiny example of what a game looks like: an example route and how random events
                        change your coins along the way.
                    </p>

                    {/* example route as connected station chips */}
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                        {DEMO_STATIONS.map((s, i) => (
                            <span key={s.name} className="d-inline-flex align-items-center gap-2">
                                <span className="lr-station-chip">
                                    <span className="lr-line-dot" style={{ backgroundColor: s.line }} />
                                    {s.name}
                                </span>
                                {i < DEMO_STATIONS.length - 1 && (
                                    <ArrowRightShort size={22} className="lr-muted" />
                                )}
                            </span>
                        ))}
                    </div>

                    {/* events list with running coin total */}
                    <div className="lr-events">
                        <div className="d-flex justify-content-between lr-event-row lr-event-head">
                            <span>Event</span>
                            <span>Coins</span>
                        </div>
                        {DEMO_EVENTS.map((e, i) => {
                            demoCoins += e.delta; // accumulate to show the running balance
                            const isGain = e.delta > 0;
                            const isLoss = e.delta < 0;
                            return (
                                <div key={i} className="d-flex justify-content-between align-items-center lr-event-row">
                                    <span className="d-flex align-items-center gap-2">
                                        {isGain && <CheckCircleFill size={16} className="text-success" />}
                                        {isLoss && <XCircleFill size={16} className="text-danger" />}
                                        {!isGain && !isLoss && <DashCircleFill size={16} className="lr-muted" />}
                                        <span className="lr-muted">{e.text}</span>
                                    </span>
                                    <span className="d-flex align-items-center gap-3">
                                        <Badge bg={isGain ? 'success' : isLoss ? 'danger' : 'secondary'}>
                                            {e.delta > 0 ? `+${e.delta}` : e.delta}
                                        </Badge>
                                        <strong className="lr-coins-total">{demoCoins}</strong>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Card.Body>
            </Card>

            {/* Metro lines */}
            <Card className="lr-card mb-4">
                <Card.Body className="p-4">
                    <h2 className="lr-subtitle mb-3">Metro Lines</h2>
                    <p className="lr-muted mb-4">
                        Four lines, change between them at interchange stations.
                    </p>
                    <Row className="g-3">
                        {[
                            { name: 'Mars', color: LINES.mars },
                            { name: 'Jupyter', color: LINES.jupiter },
                            { name: 'Earth', color: LINES.earth },
                            { name: 'Neptune', color: LINES.neptune },
                        ].map((l) => (
                            <Col xs={6} md={3} key={l.name}>
                                <div className="lr-line-card d-flex align-items-center gap-2">
                                    <span className="lr-line-dot" style={{ backgroundColor: l.color }} />
                                    <span className="lr-line-name">{l.name}</span>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>

            {/* Important Rules */}
            <Card className="lr-card mb-4">
                <Card.Body className="p-4">
                    <h2 className="lr-subtitle mb-4">Important Rules</h2>
                    <Row className="g-4">
                        <Col xs={12} md={6}>
                            <div className="d-flex gap-3">
                                <CheckCircleFill size={22} className="text-success flex-shrink-0 mt-1" />
                                <div>
                                    <p className="lr-rule-title mb-1">Valid Routes</p>
                                    <p className="lr-muted small mb-0">
                                        Routes must follow the metro lines correctly and can only change lines at
                                        interchange stations.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="d-flex gap-3">
                                <CheckCircleFill size={22} className="text-success flex-shrink-0 mt-1" />
                                <div>
                                    <p className="lr-rule-title mb-1">Station Revisits</p>
                                    <p className="lr-muted small mb-0">
                                        You can visit the same station multiple times, but cannot use the same
                                        segment twice.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="d-flex gap-3">
                                <XCircleFill size={22} className="text-danger flex-shrink-0 mt-1" />
                                <div>
                                    <p className="lr-rule-title mb-1">Invalid Routes</p>
                                    <p className="lr-muted small mb-0">
                                        Incomplete or invalid routes result in a score of 0 coins.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="d-flex gap-3">
                                <XCircleFill size={22} className="text-danger flex-shrink-0 mt-1" />
                                <div>
                                    <p className="lr-rule-title mb-1">Time Limit</p>
                                    <p className="lr-muted small mb-0">
                                        If time runs out, the route automatically submits, even if incomplete.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export { InstructionsPage };