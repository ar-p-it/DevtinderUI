import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg border-b border-purple-200 px-4">
      {/* ================= LEFT MENU ================= */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-purple-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          {/* LEFT DROPDOWN */}
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content
            bg-gradient-to-br from-purple-50 to-pink-50
            text-gray-800
            rounded-xl
            z-50
            mt-3
            w-52
            p-2
            shadow-2xl
            border border-purple-200"
          >
            <li>
              <Link to="/" className="rounded-lg hover:bg-purple-100 font-medium">
                Homepage
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="rounded-lg hover:bg-purple-100 font-medium"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="rounded-lg hover:bg-purple-100 font-medium"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= CENTER LOGO ================= */}
      <div className="navbar-center">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold
          bg-gradient-to-r from-purple-600 to-pink-600
          bg-clip-text text-transparent
          hover:scale-105 transition-transform"
        >
          devTinder
        </Link>
      </div>

      {/* ================= RIGHT MENU ================= */}
      <div className="navbar-end gap-3">
        {/* Search */}
        <button className="btn btn-ghost btn-circle hover:bg-purple-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle hover:bg-purple-100">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs bg-gradient-to-r from-purple-500 to-pink-500 border-none indicator-item"></span>
          </div>
        </button>

        {/* ================= USER DROPDOWN ================= */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost gap-2
            hover:bg-purple-100
            transition-colors
            ring-2 ring-purple-300
            rounded-full px-2"
          >
            {/* Profile Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={user?.photoUrl || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Welcome text */}
            {user && (
              <span className="font-medium text-purple-800">
                Welcome {user.firstName}
              </span>
            )}
          </div>

          {/* USER DROPDOWN MENU */}
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content
            bg-gradient-to-br from-purple-50 to-pink-50
            text-gray-800
            rounded-xl
            z-50
            mt-3
            w-52
            p-2
            shadow-2xl
            border border-purple-200"
          >
            <li>
              <Link
                to="/profile"
                className="rounded-lg hover:bg-purple-100 font-medium"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="rounded-lg hover:bg-purple-100 font-medium"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="rounded-lg hover:bg-red-100 font-medium text-red-600"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
