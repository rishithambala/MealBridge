import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import MainLayout from "../layouts/MainLayout"
import API_URL from "../config/api"

const CreateDonation = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  const [foodType, setFoodType] = useState("")
  const [quantity, setQuantity] = useState("")
  const [pickupLocation, setPickupLocation] =
    useState("")
  const [expiryHours, setExpiryHours] =
    useState("")
  const [donorPhone, setDonorPhone] =
    useState("")
  const [donorAddress, setDonorAddress] =
    useState("")
  const [deliveryNotes, setDeliveryNotes] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const { data } = await axios.post(
        `${API_URL}/api/donations`,
        {
          foodType,
          quantity,
          pickupLocation,
          expiryHours: Number(expiryHours),
          userId: userInfo._id,
          donorPhone,
          donorAddress,
          deliveryNotes,
        }
      )

      console.log(data)

      setFoodType("")
      setQuantity("")
      setPickupLocation("")
      setExpiryHours("")
      setDonorPhone("")
      setDonorAddress("")
      setDeliveryNotes("")

      toast.success(
        "Donation Created Successfully"
      )

    } catch (error) {
      console.log(error)

      toast.error(
        error?.response?.data?.message ||
        "Error Creating Donation"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <form
          onSubmit={submitHandler}
          className="bg-white p-8 rounded-2xl shadow-md w-[450px]"
        >

          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Create Donation
          </h2>

          <input
            type="text"
            placeholder="Food Type"
            className="w-full border p-3 rounded-lg mb-4"
            value={foodType}
            onChange={(e) =>
              setFoodType(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Quantity"
            className="w-full border p-3 rounded-lg mb-4"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Pickup Location"
            className="w-full border p-3 rounded-lg mb-4"
            value={pickupLocation}
            onChange={(e) =>
              setPickupLocation(e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Expiry Time (Hours)"
            className="w-full border p-3 rounded-lg mb-4"
            value={expiryHours}
            onChange={(e) =>
              setExpiryHours(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg mb-4"
            value={donorPhone}
            onChange={(e) =>
              setDonorPhone(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Full Address"
            className="w-full border p-3 rounded-lg mb-4"
            value={donorAddress}
            onChange={(e) =>
              setDonorAddress(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Pickup Instructions"
            className="w-full border p-3 rounded-lg mb-4"
            value={deliveryNotes}
            onChange={(e) =>
              setDeliveryNotes(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating Donation..."
              : "Create Donation"}
          </button>

        </form>

      </div>
    </MainLayout>
  )
}

export default CreateDonation