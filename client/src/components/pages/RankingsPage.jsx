import { useContext } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { JournalText, Clock, CashCoin, GeoAltFill, CheckCircleFill, XCircleFill, ArrowRightShort, BookHalf, Coin, DashCircleFill, Trophy, Icon1CircleFill } from 'react-bootstrap-icons';
import { AuthContext } from '../../contexts/AuthContext';

function RankingsPage() {

    const { user } = useContext(AuthContext);

    return (
        <>
            <Container className="lr-instructions py-4" style={{ maxWidth: '960px' }}>

                {/* Header */}
                <div className="text-center mb-5">
                    <div className="lr-icon-circle lr-icon-amber mx-auto mb-3">
                        <Trophy size={48} />
                    </div>
                    <h1 className="lr-title mb-2">Rankings</h1>
                    <p className="lead lr-text mx-auto" style={{ maxWidth: '640px' }}>
                        Top players by best score
                    </p>
                </div>


                {/* Important Rules */}
                <Card className="lr-card mb-4">
                    <Card.Body className="p-4">
                        <h2 className="lr-subtitle mb-4">Leaderboard</h2>
                        <Row className="g-4">
                            <Col xs={12} md={4}>

                                <div className="lr-icon-circle lr-icon-amber mx-auto mb-3">
                                    <Icon1CircleFill size={36} />
                                </div>

                            </Col>
                            <Col xs={12} md={4}>

                                <p className="lr-rule-title mb-1">{user.username}</p>

                            </Col>
                            <Col xs={12} md={4}>

                                <p className="lr-rule-title mb-1">Score</p>

                            </Col>

                        </Row>
                    </Card.Body>
                </Card>

            </Container>
        </>
    )
}

export { RankingsPage };