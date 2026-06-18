import { Card, Row, Col, Badge } from "react-bootstrap";
import { Icon1CircleFill , Icon2CircleFill , Icon3CircleFill } from "react-bootstrap-icons";

function UserCardRanking(props) {

    // Icon for the top three positions, plain number otherwise.
    const getRankIcon = (rank) => {
        if (rank === 1) return <Icon1CircleFill size={28} className="lr-rk-gold" />;
        if (rank === 2) return <Icon2CircleFill size={28} className="lr-rk-silver" />;
        if (rank === 3) return <Icon3CircleFill size={28} className="lr-rk-bronze" />;
        return <span className="lr-rk-num">#{rank}</span>;
    };

    // Extra class for the top three cards.
    const getRankClass = (rank) => {
        if (rank === 1) return 'lr-rk-card-gold';
        if (rank === 2) return 'lr-rk-card-silver';
        if (rank === 3) return 'lr-rk-card-bronze';
        return '';
    };

    const u = props.user;
    const rank = props.rank;
    const isCurrentUser = props.isCurrentUser;

    return (
        <Card
            className={`lr-rk-card ${getRankClass(rank)} ${isCurrentUser ? 'lr-rk-card-me' : ''}`}
        >
            <Card.Body className="p-4">
                <Row className="align-items-center g-0">
                    {/* Rank icon */}
                    <Col xs="auto" className="lr-rk-icon-col text-center">
                        {getRankIcon(rank)}
                    </Col>

                    {/* Username + You badge */}
                    <Col className="d-flex align-items-center gap-2 ps-3">
                        <span className="lr-rk-name text-white">{u.username}</span>
                        {isCurrentUser && <Badge bg="primary">You</Badge>}
                    </Col>

                    {/* Score */}
                    <Col xs="auto" className="text-end me-4" >
                        <div className="lr-rk-score text-white">{u.best_score}</div>
                        <div className="lr-muted small">coins</div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

}

export {UserCardRanking};