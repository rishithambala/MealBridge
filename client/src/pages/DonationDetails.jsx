import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import MainLayout from "../layouts/MainLayout"
import API_URL from "../config/api"

const DonationDetails = () => {

  const { id } = useParams()

  const [donation, setDonation] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchDonation = async () => {

      try {

        const { data } =
          await axios.get(
            `${API_URL}/api/donations/${id}`
          )

        setDonation(data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

    fetchDonation()

  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-green-600">
          Loading Donation...
        </h1>
      </div>
    )
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-red-500">
          Donation Not Found
        </h1>
      </div>
    )
  }

  const timeline = [
    {
      label: "Donation Created",
      completed: true,
    },
    {
      label: "NGO Accepted",
      completed:
        !!donation.acceptedBy,
    },
    {
      label: "Volunteer Assigned",
      completed:
        !!donation.assignedVolunteer,
    },
    {
      label: "Picked Up",
      completed:
        !!donation.pickedUpAt,
    },
    {
      label: "Delivered",
      completed:
        !!donation.deliveredAt,
    },
  ]

  return (
    <MainLayout>

      <div className="min-h-screen bg-gray-100 p-6 md:p-10">

        <div className="bg-white rounded-3xl shadow-md p-8">

          <div className="flex flex-wrap justify-between gap-4">

            <div>

              <h1 className="text-4xl font-bold text-green-600">
                {donation.foodType}
              </h1>

              <p className="text-gray-500 mt-2">
                Donation Tracking Details
              </p>

            </div>

            <div>

              <span
                className={
                  donation.priority === "High"
                    ? "bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold"
                    : donation.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold"
                    : "bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold"
                }
              >
                {donation.priority} Priority
              </span>

            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
              Donation Information
            </h2>

            <div className="space-y-4">

              <p>
                <strong>Quantity:</strong>{" "}
                {donation.quantity}
              </p>

              <p>
                <strong>Pickup Location:</strong>{" "}
                {donation.pickupLocation}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {donation.status}
              </p>

              <p>
                <strong>Expiry Hours:</strong>{" "}
                {donation.expiryHours}
              </p>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">

              <p>
                <strong>Phone:</strong>{" "}
                {donation.donorPhone ||
                  "Not Available"}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {donation.donorAddress ||
                  "Not Available"}
              </p>

              <p>
                <strong>Instructions:</strong>{" "}
                {donation.deliveryNotes ||
                  "No Instructions"}
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 mt-8">

          <h2 className="text-3xl font-bold mb-8">
            Delivery Progress
          </h2>

          <div className="space-y-5">

            {timeline.map(
              (step, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4"
                >

                  <div
                    className={
                      step.completed
                        ? "w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center"
                        : "w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center"
                    }
                  >
                    {step.completed
                      ? "✓"
                      : index + 1}
                  </div>

                  <p
                    className={
                      step.completed
                        ? "font-semibold text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {step.label}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
              NGO Information
            </h2>

            {donation.acceptedBy ? (

              <div className="space-y-3">

                <p>
                  <strong>Name:</strong>{" "}
                  {donation.acceptedBy.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {donation.acceptedBy.email}
                </p>

              </div>

            ) : (

              <p className="text-gray-500">
                No NGO has accepted this donation yet.
              </p>

            )}

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
              Volunteer Information
            </h2>

            {donation.assignedVolunteer ? (

              <div className="space-y-3">

                <p>
                  <strong>Name:</strong>{" "}
                  {donation.assignedVolunteer.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {donation.assignedVolunteer.email}
                </p>

              </div>

            ) : (

              <p className="text-gray-500">
                No volunteer assigned yet.
              </p>

            )}

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default DonationDetails