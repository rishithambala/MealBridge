import User from "../models/User.js"
import Donation from "../models/Donation.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
  return jwt.sign(
    { id },
    "mealbridge_secret",
    {
      expiresIn: "30d",
    }
  )
}

export const registerUser = async (
  req,
  res
) => {
  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body

    const userExists =
      await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        message:
          "User already exists",
      })
    }

    const salt =
      await bcrypt.genSalt(10)

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      )

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role,
      })

    if (user) {

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(
          user._id
        ),
      })

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

export const loginUser = async (
  req,
  res
) => {
  try {

    const {
      email,
      password,
    } = req.body

    const user =
      await User.findOne({
        email,
      })

    if (
      user &&
      (
        await bcrypt.compare(
          password,
          user.password
        )
      )
    ) {

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(
          user._id
        ),
      })

    } else {

      res.status(401).json({
        message:
          "Invalid email or password",
      })

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

export const getPlatformStats =
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments()

      const totalDonors =
        await User.countDocuments({
          role: {
            $in: [
              "donor",
              "restaurant",
            ],
          },
        })

      const totalNGOs =
        await User.countDocuments({
          role: "ngo",
        })

      const totalVolunteers =
        await User.countDocuments({
          role: "volunteer",
        })

      const totalDonations =
        await Donation.countDocuments()

      const deliveredDonations =
        await Donation.countDocuments({
          status:
            "Delivered",
        })

      res.json({
        users:
          totalUsers,

        donors:
          totalDonors,

        ngos:
          totalNGOs,

        volunteers:
          totalVolunteers,

        donations:
          totalDonations,

        delivered:
          deliveredDonations,
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })

    }
  }