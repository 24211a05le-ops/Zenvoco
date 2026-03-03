function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Create Account
        </h2>

        <input 
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input 
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input 
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-6"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Register
        </button>
      </div>
    </div>
  )
}

export default Register