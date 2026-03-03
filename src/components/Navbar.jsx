import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        Zenvoco
      </h1>

      <div className="space-x-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        <Link to="/login" className="text-gray-600 hover:text-blue-600">
          Login
        </Link>
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Register
        </Link>
      </div>
    </nav>
  )
}

export default Navbar