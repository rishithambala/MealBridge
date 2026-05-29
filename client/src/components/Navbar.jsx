import { Link, useLocation } from "react-router-dom"
import toast from "react-hot-toast"

const Navbar = () => {

  const location = useLocation()

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "null"
  )

  const logoutHandler = () => {

    localStorage.removeItem("userInfo")

    toast.success(
      "Logged Out Successfully"
    )

    window.location.href = "/"

  }

  const activeClass = (path) =>
    location.pathname === path
      ? "text-green-600 font-semibold"
      : "text-gray-700 hover:text-green-600"

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/">

          <div>

            <h1 className="text-3xl font-bold text-green-600">
              MealBridge
            </h1>

            <p className="text-xs text-gray-500">
              AI-Powered Food Redistribution
            </p>

          </div>

        </Link>

        <div className="flex items-center gap-6 flex-wrap">

          <Link
            to="/"
            className={activeClass("/")}
          >
            Home
          </Link>

          {userInfo && (

            <Link
              to="/dashboard"
              className={activeClass("/dashboard")}
            >
              Dashboard
            </Link>

          )}

          {(userInfo?.role === "donor" ||
            userInfo?.role === "restaurant") && (

            <Link
              to="/create-donation"
              className={activeClass("/create-donation")}
            >
              Create Donation
            </Link>

          )}

          {(userInfo?.role === "ngo" ||
            userInfo?.role === "volunteer") && (

            <Link
              to="/donations"
              className={activeClass("/donations")}
            >
              Donations
            </Link>

          )}

          {userInfo && (

            <Link
              to="/ai-predict"
              className={activeClass("/ai-predict")}
            >
              AI Prediction
            </Link>

          )}

          {!userInfo ? (

            <>

              <Link to="/login">

                <button className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition">
                  Login
                </button>

              </Link>

              <Link to="/register">

                <button className="border border-green-600 text-green-600 px-5 py-2 rounded-xl hover:bg-green-50 transition">
                  Register
                </button>

              </Link>

            </>

          ) : (

            <>

              <div className="hidden md:flex flex-col text-right">

                <span className="font-semibold text-gray-800">
                  {userInfo.name}
                </span>

                <span className="text-xs text-gray-500 capitalize">
                  {userInfo.role}
                </span>

              </div>

              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>

    </nav>
  )
}

export default Navbar