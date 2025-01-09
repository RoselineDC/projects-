// for page  header
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLogged } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Ontime Solutions</Link>
        </span>
        <span className="flex space-x-2">
          {isLogged ? (
            <>
              <Link to="my-dashbord">My Dashboard</Link>
              <button>Sign Out</button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
          {/* <Link to="/sign-up"></Link> */}
        </span>
      </div>
    </div>
  );
};
export default Header;
