import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"
import API_URL from "../config/api"

const Donations = () => {
  const [donations, setDonations] = useState([])
const [search, setSearch] = useState("")
const [statusFilter, setStatusFilter] =
  useState("All")
const [priorityFilter, setPriorityFilter] =
  useState("All")
  const [loading, setLoading] = useState(true)
	
const navigate = useNavigate()

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  )

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/donations`
        )

        const sorted = data.sort((a, b) => {
          const priorityOrder = {
            High: 3,
            Medium: 2,
            Low: 1,
          }

          return (
            priorityOrder[b.priority] -
            priorityOrder[a.priority]
          )
        })

        setDonations(sorted)
      } catch (error) {
        console.log(error)

        toast.error(
          "Unable to load donations"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.patch(
        `${API_URL}/api/donations/${id}`,
        {
          status,
        }
      )

      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === id
            ? {
                ...donation,
                status,
              }
            : donation
        )
      )

      toast.success(
        `Status Updated: ${status}`
      )
    } catch (error) {
      console.log(error)

      toast.error(
        "Unable to update status"
      )
    }
  }

  const acceptDonation = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/api/donations/${id}/accept`,
        {
          ngoId: userInfo._id,
        }
      )

      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === id
            ? {
                ...donation,
                acceptedBy: userInfo,
                status: "Accepted",
              }
            : donation
        )
      )

      toast.success(
        "Donation Accepted"
      )
    } catch (error) {
      console.log(error)

      toast.error(
        error?.response?.data?.message ||
          "Unable to accept donation"
      )
    }
  }

  const assignVolunteer = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/api/donations/${id}/assign`,
        {
          volunteerId: userInfo._id,
        }
      )

      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === id
            ? {
                ...donation,
                assignedVolunteer:
                  userInfo,
                status:
                  "Volunteer Assigned",
              }
            : donation
        )
      )

      toast.success(
        "Delivery Assigned"
      )
    } catch (error) {
      console.log(error)

      toast.error(
        error?.response?.data?.message ||
          "Unable to assign delivery"
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-green-600">
          Loading Donations...
        </h1>
      </div>
    )
  }

const filteredDonations =
  donations.filter((donation) => {

    const searchMatch =
      donation.foodType
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      donation.pickupLocation
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    const statusMatch =
      statusFilter === "All" ||
      donation.status === statusFilter

    const priorityMatch =
      priorityFilter === "All" ||
      donation.priority ===
        priorityFilter

    return (
      searchMatch &&
      statusMatch &&
      priorityMatch
    )
  })


  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold text-green-600 mb-10">
          Food Donations
        </h1>
<div className="bg-white p-6 rounded-2xl shadow-md mb-8">

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search Food or Location"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border p-3 rounded-lg"
    />

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(
          e.target.value
        )
      }
      className="border p-3 rounded-lg"
    >
      <option>All</option>
      <option>Pending</option>
      <option>Accepted</option>
      <option>
        Volunteer Assigned
      </option>
      <option>Picked Up</option>
      <option>Delivered</option>
    </select>

    <select
      value={priorityFilter}
      onChange={(e) =>
        setPriorityFilter(
          e.target.value
        )
      }
      className="border p-3 rounded-lg"
    >
      <option>All</option>
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>

  </div>

</div>

        {filteredDonations.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl text-gray-500">
              No donations available
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{filteredDonations.map(
  (donation) => (
              <div
  key={donation._id}
  onClick={() =>
    navigate(
      `/donation/${donation._id}`
    )
  }
                className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition cursor-pointer"
              >

                <h2 className="text-2xl font-bold text-green-600">
                  {donation.foodType}
                </h2>

                <p className="mt-3">
                  Quantity: {donation.quantity}
                </p>

                <p className="mt-2">
                  Pickup: {donation.pickupLocation}
                </p>

                <div className="mt-3">
                  <span
                    className={
                      donation.priority === "High"
                        ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold"
                        : donation.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold"
                        : "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                    }
                  >
                    {donation.priority} Priority
                  </span>
                </div>

                <div className="mt-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {donation.status}
                  </span>
                </div>

                {donation.pickedUpAt && (
                  <p className="mt-3 text-sm text-blue-600">
                    Picked Up:
                    {" "}
                    {new Date(
                      donation.pickedUpAt
                    ).toLocaleString()}
                  </p>
                )}

                {donation.deliveredAt && (
                  <p className="mt-2 text-sm text-green-600">
                    Delivered:
                    {" "}
                    {new Date(
                      donation.deliveredAt
                    ).toLocaleString()}
                  </p>
                )}

                <div className="mt-4 flex gap-2 flex-wrap">

                  {userInfo?.role === "ngo" &&
                    !donation.acceptedBy && (
                      <button
                        onClick={() =>
                          acceptDonation(
                            donation._id
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                      >
                        Accept Donation
                      </button>
                    )}

                  {userInfo?.role ===
                    "volunteer" &&
                    donation.acceptedBy &&
                    !donation.assignedVolunteer && (
                      <button
                        onClick={() =>
                          assignVolunteer(
                            donation._id
                          )
                        }
                        className="bg-orange-500 text-white px-3 py-2 rounded-lg"
                      >
                        Take Delivery
                      </button>
                    )}

{userInfo?.role === "volunteer" &&
  donation.assignedVolunteer?._id ===
    userInfo._id && (

  <div className="flex gap-2 flex-wrap">

    {donation.status ===
      "Volunteer Assigned" && (

      <button
        onClick={() =>
          updateStatus(
            donation._id,
            "Picked Up"
          )
        }
        className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
      >
        Picked Up
      </button>

    )}

    {donation.status ===
      "Picked Up" && (

      <button
        onClick={() =>
          updateStatus(
            donation._id,
            "Delivered"
          )
        }
        className="bg-green-600 text-white px-3 py-2 rounded-lg"
      >
        Delivered
      </button>

    )}

    {donation.status ===
      "Delivered" && (

      <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-semibold">
        ✅ Delivery Completed
      </span>

    )}

  </div>

)}

                </div>

                <div className="mt-4 border-t pt-4">

                  <p className="text-sm text-gray-500">
                    Donor
                  </p>

                  <p className="font-semibold">
                    {donation.donor?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {donation.donor?.email}
                  </p>

                  {donation.acceptedBy && (
                    <div className="mt-3">

                      <p className="text-sm text-gray-500">
                        📞 {donation.donorPhone}
                      </p>

                      <p className="text-sm text-gray-500">
                        📍 {donation.donorAddress}
                      </p>

                      <p className="text-sm text-gray-500">
                        📝 {donation.deliveryNotes}
                      </p>

                    </div>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </MainLayout>
  )
}

export default Donations