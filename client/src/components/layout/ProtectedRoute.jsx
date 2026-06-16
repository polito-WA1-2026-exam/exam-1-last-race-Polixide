import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';

function ProtectedRoute() {

  const { user, loading } = useContext(AuthContext);


  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export { ProtectedRoute };