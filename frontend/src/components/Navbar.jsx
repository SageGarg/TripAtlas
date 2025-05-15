import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">TravelMate</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/explore" className="hover:underline">Explore</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
