import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import MainLayout from "../layouts/MainLayout"
import { Link, useNavigate } from "react-router-dom"
import API_URL from "../config/api"

const Dashboard = () => {
  const navigate = useNavigate()

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  )

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    delivered: 0,
    pickedUp: 0,
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
          url = `${API_URL}/api/donations/my/${userInfo._id}`
        }

        if (userInfo.role === "ngo") {
          url = `${API_URL}/api/donations/ngo/${userInfo._id}`
        }

        if (userInfo.role === "volunteer") {
          url = `${API_URL}/api/donations/volunteer/${userInfo._id}`
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

    navigate("/login")
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-8">

        <div className="bg-white rounded-2xl shadow-md p-8">

          <h1 className="text-4xl font-bold text-green-600">
            Welcome, {userInfo?.name}
          </h1>

          <p className="mt-2 text-gray-600 capitalize">
            {userInfo?.role}
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-gray-500">
              Total
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-4xl font-bold text-yellow-500 mt-2">
              {stats.pending}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-gray-500">
              Accepted
            </h3>

            <p className="text-4xl font-bold text-blue-500 mt-2">
              {stats.accepted}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-gray-500">
              Delivered
            </h3>

            <p className="text-4xl font-bold text-green-500 mt-2">
              {stats.delivered}
            </p>
          </div>

        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-500">
              No records available
            </p>
          ) : (
            <div className="space-y-4">

              {items.slice(0, 5).map((item) => (

                <div
                  key={item._id}
                  className="border rounded-xl p-4"
                >

                  <h3 className="font-bold text-green-600">
                    {item.foodType}
                  </h3>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Status: {item.status}
                  </p>

                </div>

              ))}

            </div>
          )}

        </div>

        <div className="mt-10 flex gap-4 flex-wrap">

          {(userInfo.role === "donor" ||
            userInfo.role === "restaurant") && (
            <Link to="/create-donation">
              <button className="bg-green-600 text-white px-5 py-3 rounded-lg">
                Create Donation
              </button>
            </Link>
          )}

          <Link to="/donations">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
              View Donations
            </button>
          </Link>

          <Link to="/ai-predict">
            <button className="bg-purple-600 text-white px-5 py-3 rounded-lg">
              AI Prediction
            </button>
          </Link>

          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-5 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>
    </MainLayout>
  )
}

export default Dashboard