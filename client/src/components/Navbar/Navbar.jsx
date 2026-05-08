import "./Navbar.css";

import { Link } from "react-router-dom";

import useAuth from "../../context/authContext";
import { FaMagnifyingGlass, FaStar } from "react-icons/fa6";

const Navbar = ({ searchValue = "", onSearchChange }) => {
  const { isLoggedIn, logout } =
    useAuth();

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard" className="brand-mark" aria-label="Review and Rate dashboard">
          <FaStar />
        </Link>
        <h2>
          Review<span>&amp;RATE</span>
        </h2>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search..."
        />
        <FaMagnifyingGlass />
      </div>

      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <Link to="/signup">
              Signup
            </Link>

            <Link to="/login">
              Login
            </Link>
          </>
        ) : (
          <button onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
