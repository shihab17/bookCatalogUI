import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/user/userSlice";

const Navbar = () => {
  const { accessToken } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            {/* <img src={logo} alt="Logo" className="h-8 w-auto mr-4" /> */}
            <Link
              to="/"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            {accessToken && (
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            )}
          </div>
          <div className="flex">
            {!accessToken && (
              <>
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
            {accessToken && (
              <span
                onClick={handleLogout}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
