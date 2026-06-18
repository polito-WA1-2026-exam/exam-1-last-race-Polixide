import { useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router';
import { House, Book, TrainFront, Trophy, BoxArrowRight, BoxArrowInRight, Controller, BoxArrowInLeft } from 'react-bootstrap-icons';
import { AuthContext } from '../../contexts/AuthContext';

function NavHeader() {
  const { user, logout } = useContext(AuthContext);
  const isAuthenticated = !!user;
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinkClass = (path) =>
    `d-flex align-items-center gap-2 fs-5 ${isActive(path) ? 'active fw-semibold' : ''}`;

  return (
    <Navbar variant="dark" expand="lg" sticky="top" className="lr-navbar py-2">
      <Container fluid="lg">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fs-4 fw-bold text-white">
          <TrainFront size={32} className="text-primary" />
          <span>Last Race</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={navLinkClass('/')}>
              <House size={16} />
              <span>Home</span>
            </Nav.Link>

            <Nav.Link as={Link} to="/instructions" className={navLinkClass('/instructions')}>
              <Book size={16} />
              <span>Instructions</span>
            </Nav.Link>

            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/game" className={navLinkClass('/game')}>
                  <Controller size={16} />
                  <span>Play Game</span>
                </Nav.Link>

                <Nav.Link as={Link} to="/rankings" className={navLinkClass('/rankings')}>
                  <Trophy size={16} />
                  <span>Rankings</span>
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto d-flex align-items-lg-center gap-2">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-2 lr-muted fs-5">
                  Welcome, <strong className="text-white">{user?.username}</strong>
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout} className="d-flex align-items-center gap-2 px-4 fs-5">
                  <BoxArrowInLeft size={20} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" className="lr-btn-primary d-flex align-items-center gap-2 px-4 fs-5">
                <BoxArrowInRight size={20} />
                <span>Login</span>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavHeader;