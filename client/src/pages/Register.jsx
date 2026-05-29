import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import API_URL from "../config/api"

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("donor")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userInfo =
      localStorage.getItem("userInfo")

    if (userInfo) {
      navigate("/dashboard")
    }
  }, [navigate])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          role,
        }
      )

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      )

      toast.success(
        "Registration Successful"
      )

      navigate("/dashboard")
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Registration Failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-2xl shadow-md w-[400px]"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <select
          className="w-full border p-3 rounded-lg mb-4"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="donor">
            Donor
          </option>

          <option value="restaurant">
            Restaurant
          </option>

          <option value="ngo">
            NGO
          </option>

          <option value="volunteer">
            Volunteer
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>
    </div>
  )
}

export default Register