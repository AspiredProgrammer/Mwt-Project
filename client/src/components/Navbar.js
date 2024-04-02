// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token') !==null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href="/";
  };

  return (
    <div>
      <Link to="/"><img src="./assets/e-Shop-s.png" alt="logo"/></Link>
      {isLoggedIn && (
        <>
          {/* Link to Ho */}
          <Link to="/">Home</Link>
          <br/>
          <button onClick={handleLogout}>Logout</button>
          <br/>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/register">Register</Link>
          <br/>
          <Link to="/login">Login</Link>
          <br/>
        </>
      )}
    </div>
  )
}

export default Navbar