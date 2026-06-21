import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import {
  ArrowRight,
  CashCoin,
  CheckCircleFill,
  XCircleFill,
  ExclamationCircleFill,
  TrophyFill,
  ArrowLeftRight,
  Check2Circle,
  QuestionCircleFill,
  FastForward
} from 'react-bootstrap-icons';

function CoinDelta({ value }) {
  if (value >= 0) return <span className="text-success fw-semibold">+{value} coins</span>;
  return <span className="text-danger fw-semibold">{value} coins</span>;
  
}

function ExecutionPhase({ executionData, onFinished }) {
  const {
    valid,
    invalidReason,
    steps = [],
    finalScore
  } = executionData;

  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);

  const handleNext = () => {
    if (!valid || done) return;

    const nextStep = currentStep + 1;

    if (nextStep < steps.length) {
      setCurrentStep(nextStep);

      if (nextStep === steps.length - 1) {
        setDone(true);
      }
    }
  };

  const displayCoins = currentStep >= 0 && steps[currentStep] ? steps[currentStep].runningTotal : 20;


  if (!valid) {
    return (
      <div className="text-center py-4">
        <XCircleFill size={48} className="text-danger mb-3" />
        <h1 className="lr-rk-title text-white mb-3">Invalid Route</h1>

        <Card className="lr-rk-card mx-auto mb-4" style={{ maxWidth: 520 }}>
          <Card.Body className="p-4">
            <p className="lr-muted mb-1">Your route could not be executed:</p>
            <p className="text-danger mb-0">
              {invalidReason ?? 'Route was incomplete or invalid.'}
            </p>
          </Card.Body>
        </Card>

        <Button
          className="lr-btn-primary d-inline-flex align-items-center gap-2 px-4"
          onClick={onFinished}
        >
          <Check2Circle size={16} />
          <span>See Results</span>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="lr-rk-title text-white mb-2 fs-3">Execution Phase</h1>
        <p className="lr-muted mb-0">Proceed step by step through your journey.</p>
      </div>

      <Card className="lr-rk-card mb-4">
        <Card.Body className="p-4 text-center">
          <CashCoin size={32} className="text-warning mb-2" />
          <div className="lr-muted small">Current Coins</div>
          <div className="lr-exec-coins-simple text-white">{displayCoins}</div>
        </Card.Body>
      </Card>

      <Card className="lr-rk-card mb-4">
        <Card.Body className="p-4">
          <div className="d-flex align-items-baseline gap-2 mb-4">
            <h2 className="lr-planning-section-title mb-0">Journey Progress</h2>
            <span className="lr-planning-section-hint">
              ({steps.length} segments)
            </span>
          </div>

          <div className="d-flex flex-column gap-3">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              

              return (
                <div
                  key={index}
                  className={`lr-exec-step-simple${isCurrent ? ' lr-exec-step-simple--current' : ''
                    }${index > currentStep ? ' lr-exec-step-simple--pending' : ''}`}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <CheckCircleFill size={20} className="text-success" />
                      ) : (
                        <div className="lr-exec-step-dot" />
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white fw-semibold">{step.fromStation}</span>
                        <ArrowLeftRight size={14} className="lr-muted" />
                        <span className="text-white fw-semibold">{step.toStation}</span>
                      </div>

                      {isCompleted && (
                        <div className="d-flex align-items-start gap-2 mt-2">
                          <QuestionCircleFill size={14} className="lr-muted flex-shrink-0 mt-1" />
                          <div>
                            <div className="lr-muted small">{step.event}</div>
                            <div className="small mt-1">
                              <CoinDelta value={step.coinChange} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            {!done ? (
              <Button
                className="lr-btn-primary d-inline-flex align-items-center gap-2 px-4"
                onClick={handleNext}
                disabled={steps.length === 0}
              >
                {currentStep < 0 ? 'Start Execution' : 'Next'}
                <FastForward size={20}/>
              </Button>
            ) : (
              <Button
                className="lr-btn-primary d-inline-flex align-items-center gap-2 px-4"
                onClick={onFinished}
              >
                <Check2Circle size={16} />
                <span>See Results</span>
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

    </div>
  );
}

export { ExecutionPhase };