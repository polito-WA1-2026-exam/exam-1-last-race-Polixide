import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { BoxArrowInRight, ExclamationCircle } from 'react-bootstrap-icons';
import { AuthContext } from '../../contexts/AuthContext';

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await login({ username, password });
            navigate('/game');
        } catch (err) {
            setError(err.message || 'Wrong credentials');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-5" style={{ maxWidth: '520px' }}>
            <Card className="lr-card shadow">
                <Card.Body className="p-4 p-md-5">
                    {/* Header  */}
                    <div className="text-center mb-4">
                        <div className="lr-icon-circle mb-3">
                            <BoxArrowInRight className="text-primary" size={34} />
                        </div>
                        <h1 className="fw-bold text-white mb-2">Welcome Back</h1>
                        <p className="lr-muted mb-0">Login to start playing Last Race</p>
                    </div>

                    {error && (
                        <Alert variant="danger" className="d-flex align-items-start gap-2">
                            <ExclamationCircle className="flex-shrink-0 mt-1" />
                            <span>{error}</span>
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="text-white fw-medium">Username</Form.Label>
                            <Form.Control
                                className="lr-input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label className="text-white fw-medium">Password</Form.Label>
                            <Form.Control
                                className="lr-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="lr-btn-primary w-100" disabled={submitting}>
                            {submitting ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>

                    {/* Demo accounts */}
                    <div className="mt-4 pt-4 border-top" style={{ borderColor: 'var(--lr-border)' }}>
                        <p className="lr-muted small mb-2">Demo accounts:</p>
                        <div className="d-flex flex-column gap-2">
                            {[
                                { u: 'dani.c', p: 'password!' },
                                { u: 'user.1', p: 'password!' },
                                { u: 'user.2', p: 'password!' },
                            ].map((acc) => (
                                <div key={acc.u}
                                    className="d-flex justify-content-between align-items-center p-2 rounded small"
                                    style={{ backgroundColor: 'var(--lr-input-bg)' }}>
                                    <span className="text-white">{acc.u}</span>
                                    <span className="lr-muted">{acc.p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export { LoginPage };