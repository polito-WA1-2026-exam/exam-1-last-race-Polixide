import { Outlet } from 'react-router';
import NavHeader from './NavHeader.jsx';

/*
Standard Layout for all the pages
*/
function Layout() {
  return (
    <>
      <NavHeader />
      <main className="container mt-3">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;