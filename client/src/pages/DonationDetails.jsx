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
        Loading...
      </div>
    )
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Donation Not Found
      </div>
    )
  }

  return (
    <MainLayout>

      <div className="min-h-screen bg-gray-100 p-10">

        <div className="bg-white rounded-2xl shadow-md p-8">

          <h1 className="text-4xl font-bold text-green-600">
            {donation.foodType}
          </h1>

          <div className="mt-6 space-y-3">

            <p>
              Quantity:
              {" "}
              {donation.quantity}
            </p>

            <p>
              Pickup Location:
              {" "}
              {donation.pickupLocation}
            </p>

            <p>
              Priority:
              {" "}
              {donation.priority}
            </p>

            <p>
              Status:
              {" "}
              {donation.status}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Delivery Timeline
          </h2>

          <ul className="space-y-3">

            <li>
              ✅ Donation Created
            </li>

            {donation.acceptedBy && (
              <li>
                ✅ NGO Accepted
              </li>
            )}

            {donation.assignedVolunteer && (
              <li>
                ✅ Volunteer Assigned
              </li>
            )}

            {donation.pickedUpAt && (
              <li>
                ✅ Picked Up
              </li>
            )}

            {donation.deliveredAt && (
              <li>
                ✅ Delivered
              </li>
            )}

          </ul>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Contact Information
          </h2>

          <p>
            Phone:
            {" "}
            {donation.donorPhone}
          </p>

          <p>
            Address:
            {" "}
            {donation.donorAddress}
          </p>

          <p>
            Notes:
            {" "}
            {donation.deliveryNotes}
          </p>

        </div>

      </div>

    </MainLayout>
  )
}

export default DonationDetails