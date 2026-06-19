import { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import {SetupPhase} from '../ui/SetupPhase'
import {ExecutionPhase} from '../ui/ExecutionPhase'
import {PlanningPhase} from '../ui/PlanningPhase'
import {ResultPhase} from '../ui/ResultPhase'


function GamePage() {
  
  const [phase, setPhase] = useState('setup');
  const [game, setGame] = useState(null);   
  const [result, setResult] = useState(null); 
  const [error, setError] = useState('');


  // Render the component matching the current phase.
  const renderPhase = () => {
    switch (phase) {
      case 'setup':
        return (
          <SetupPhase/>
        );
      case 'planning':
        return (
          <PlanningPhase/>
        );
      case 'execution':
        return (
          <ExecutionPhase/>
        );
      case 'result':
        return (
          <ResultPhase/>
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

export {GamePage};