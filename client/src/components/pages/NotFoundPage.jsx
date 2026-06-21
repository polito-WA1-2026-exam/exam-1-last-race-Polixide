import { Link } from 'react-router';
import { ExclamationTriangleFill, House, HouseFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

function NotFoundPage() {
    return (
        <div className="text-center mx-auto" style={{ maxWidth: '640px' }}>
            <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                style={{ width: 96, height: 96, background: 'rgba(245,158,11,0.2)' }}
            >
                <ExclamationTriangleFill size={48} className="text-warning" />
            </div>

            <h1 className="text-white fw-bold mb-3" style={{ fontSize: '5rem' }}>404</h1>
            <h2 className="text-white fw-semibold mb-3 fs-3">Page Not Found</h2>
            <p className="lr-muted mb-5 fs-5">
                Oops! Looks like you've taken a wrong turn on the metro network.
            </p>
            <Link to='/'>
                <Button className="lr-btn-primary d-inline-flex align-items-center gap-2 px-5 py-3 fs-5">
                    <House size={22} />
                    <span>Go Back Home</span>
                </Button>
            </Link>


        </div>
    );
}

export { NotFoundPage };
