import { useState, useEffect } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { SetupPhase } from '../ui/SetupPhase';
import { PlanningPhase } from '../ui/PlanningPhase';
import { ExecutionPhase } from '../ui/ExecutionPhase';
import { ResultPhase } from '../ui/ResultPhase';
import { getNetwork, createGame } from '../../api/game';

function GamePage() {

    const [phase, setPhase] = useState('setup');
    const [networkData, setNetworkData] = useState(null);
    const [game, setGame] = useState(null);
    const [executionData, setExecutionData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNetwork()
            .then(data => setNetworkData(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleReady = async () => {
        try {
            setError('');
            const gameData = await createGame();
            setGame(gameData);
            setPhase('planning');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRouteSubmitted = async (route) => {
        try {
            setError('');
            const result = await submitRoute(game.gameId, route);
            setExecutionData(result);
            // If route is invalid/incomplete, skip execution and go straight to result
            setPhase(result.valid ? 'execution' : 'result');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleNewGame = () => {
        setGame(null);
        setExecutionData(null);
        setError('');
        setPhase('setup');
    };

    if (loading) {
        return (
            <Container className="py-5 text-center" style={{ maxWidth: '960px' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading network…</span>
                </Spinner>
                <p className="lr-muted mt-3">Loading network data…</p>
            </Container>
        );
    }

    const renderPhase = () => {
        switch (phase) {
            case 'setup':
                return <SetupPhase networkData={networkData} onReady={handleReady} />;
            case 'planning':
                return (
                    <PlanningPhase networkData={networkData} game={game} onSubmitted={handleRouteSubmitted} />
                );
            case 'execution':
                return (
                    <ExecutionPhase />
                );
            case 'result':
                return (
                    <ResultPhase />
                );
            default:
                return null;
        }
    };

    return (
        <Container className="py-4" style={{ maxWidth: '960px' }}>
            {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                </Alert>
            )}
            {renderPhase()}
        </Container>
    );
}

export { GamePage };
