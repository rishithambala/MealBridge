import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Navbar = () => {
  const navigate = useNavigate()

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "null"
  )

const logoutHandler = () => {
  localStorage.removeItem("userInfo")

  toast.success("Logged Out Successfully")

  window.location.href = "/"
}
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <Link to="/">
        <h1 className="text-2xl font-bold text-green-600">
          MealBridge
        </h1>
      </Link>

      <div className="flex gap-4 items-center flex-wrap">

        <Link
          to="/"
          className="hover:text-green-600"
        >
          Home
        </Link>

        {userInfo && (
          <Link
            to="/dashboard"
            className="hover:text-green-600"
          >
            Dashboard
          </Link>
        )}

        {(userInfo?.role === "donor" ||
          userInfo?.role === "restaurant") && (
          <Link
            to="/create-donation"
            className="hover:text-green-600"
          >
            Create Donation
          </Link>
        )}

        {(userInfo?.role === "ngo" ||
          userInfo?.role === "volunteer") && (
          <Link
            to="/donations"
            className="hover:text-green-600"
          >
            Manage Donations
          </Link>
        )}

        {userInfo && (
          <Link
            to="/ai-predict"
            className="hover:text-green-600"
          >
            AI Prediction
          </Link>
        )}

        {!userInfo ? (
          <>
            <Link to="/login">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition">
                Register
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="hidden md:block text-sm text-gray-600">
              Welcome,{" "}
              <span className="font-semibold">
                {userInfo.name}
              </span>
            </div>

            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar