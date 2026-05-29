import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import MainLayout from "../layouts/MainLayout"
import { Link } from "react-router-dom"
import API_URL from "../config/api"

const Dashboard = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  )

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    pickedUp: 0,
    delivered: 0,
  })

  const [items, setItems] = useState([])

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        let url = ""

        if (
          userInfo.role === "donor" ||
          userInfo.role === "restaurant"
        ) {
          url =
            `${API_URL}/api/donations/my/${userInfo._id}`
        }

        if (userInfo.role === "ngo") {
          url =
            `${API_URL}/api/donations/ngo/${userInfo._id}`
        }

        if (userInfo.role === "volunteer") {
          url =
            `${API_URL}/api/donations/volunteer/${userInfo._id}`
        }

        const { data } = await axios.get(url)

        setItems(data)

        setStats({
          total: data.length,

          pending: data.filter(
            (d) => d.status === "Pending"
          ).length,

          accepted: data.filter(
            (d) =>
              d.status === "Accepted" ||
              d.status ===
                "Volunteer Assigned"
          ).length,

          pickedUp: data.filter(
            (d) => d.status === "Picked Up"
          ).length,

          delivered: data.filter(
            (d) => d.status === "Delivered"
          ).length,
        })

      } catch (error) {

        console.log(error)

      }

    }

    fetchDashboardData()

  }, [])

  const logoutHandler = () => {

    localStorage.removeItem("userInfo")

    toast.success(
      "Logged Out Successfully"
    )

    window.location.href = "/"

  }

  return (
    <MainLayout>

      <div className="min-h-screen bg-gray-100 p-6 md:p-10">

        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl p-10 shadow-lg">

          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome, {userInfo?.name}
          </h1>

          <p className="mt-3 text-green-100 capitalize text-lg">
            {userInfo?.role}
          </p>

          <p className="mt-5 text-green-50">
            Helping reduce food waste and feed
            communities through MealBridge.
          </p>

        </div>

        <div className="grid md:grid-cols-5 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500">
              Total
            </p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {stats.total}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500">
              Pending
            </p>
            <h2 className="text-4xl font-bold text-yellow-500 mt-2">
              {stats.pending}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500">
              Accepted
            </p>
            <h2 className="text-4xl font-bold text-blue-500 mt-2">
              {stats.accepted}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500">
              Picked Up
            </p>
            <h2 className="text-4xl font-bold text-purple-500 mt-2">
              {stats.pickedUp}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500">
              Delivered
            </p>
            <h2 className="text-4xl font-bold text-green-500 mt-2">
              {stats.delivered}
            </h2>
          </div>

        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Activity
          </h2>

          {items.length === 0 ? (

            <div className="text-center py-12">

              <h3 className="text-2xl font-semibold text-gray-700">
                No Activity Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Create or manage donations to
                see activity here.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {items.slice(0, 5).map((item) => (

                <div
                  key={item._id}
                  className="border rounded-2xl p-5 hover:bg-gray-50 transition"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-xl font-bold text-green-600">
                        {item.foodType}
                      </h3>

                      <p className="text-gray-600 mt-1">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                      {item.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-3xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            {(userInfo.role === "donor" ||
              userInfo.role === "restaurant") && (

              <Link to="/create-donation">

                <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
                  Create Donation
                </button>

              </Link>

            )}

            <Link to="/donations">

              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                View Donations
              </button>

            </Link>

            <Link to="/ai-predict">

              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
                AI Prediction
              </button>

            </Link>

            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default Dashboard