import { Link } from "react-router-dom"

function Welcome() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-6">
      
      <h1 className="text-5xl font-bold text-blue-600">
        Master the Art of <br></br>
        fearless Communication with Zenvoco
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl">
        Zenvoco is an AI-powered communication confidence system 
        designed to help students improve speaking skills, 
        receive intelligent feedback, and track confidence growth.
      </p>

      <div className="mt-8 space-x-4">
        <Link 
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>

        <Link 
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>

    </div>
  )
}

export default Welcome