import Donation from "../models/Donation.js"

export const createDonation = async (req, res) => {
  try {
    const {
      foodType,
      quantity,
      pickupLocation,
      expiryHours,
      donorPhone,
      donorAddress,
      deliveryNotes,
      foodImages,
    } = req.body

    let priority = "Low"

    if (expiryHours <= 2) {
      priority = "High"
    } else if (expiryHours <= 6) {
      priority = "Medium"
    }

    const donation = await Donation.create({
      donor: req.body.userId,
      foodType,
      quantity,
      pickupLocation,
      expiryHours,
      priority,
      donorPhone,
      donorAddress,
      deliveryNotes,
      foodImages: foodImages || [],
    })

    res.status(201).json(donation)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({})
      .populate(
        "donor",
        "name email phone organization"
      )
      .populate(
        "acceptedBy",
        "name email organization"
      )
      .populate(
        "assignedVolunteer",
        "name email phone"
      )
      .sort({ createdAt: -1 })

    res.json(donations)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.params.userId,
    }).sort({ createdAt: -1 })

    res.json(donations)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getVolunteerDeliveries = async (
  req,
  res
) => {
  try {
    const donations = await Donation.find({
      assignedVolunteer: req.params.userId,
    })
      .populate(
        "donor",
        "name phone organization"
      )
      .sort({ createdAt: -1 })

    res.json(donations)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getNGODonations = async (
  req,
  res
) => {
  try {
    const donations = await Donation.find({
      acceptedBy: req.params.userId,
    })
      .populate(
        "donor",
        "name phone organization"
      )
      .populate(
        "assignedVolunteer",
        "name phone"
      )
      .sort({ createdAt: -1 })

    res.json(donations)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const updateDonationStatus = async (
  req,
  res
) => {
  try {
    const donation = await Donation.findById(
      req.params.id
    )

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      })
    }

if (donation.status === "Delivered") {
  return res.status(400).json({
    message:
      "Delivered donations cannot be modified",
  })
}

donation.status = req.body.status

if (req.body.status === "Picked Up") {
  donation.pickedUpAt = new Date()
}

if (req.body.status === "Delivered") {
  donation.deliveredAt = new Date()
}
    await donation.save()

    res.json(donation)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const acceptDonation = async (
  req,
  res
) => {
  try {
    const donation = await Donation.findById(
      req.params.id
    )

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      })
    }

    if (donation.acceptedBy) {
      return res.status(400).json({
        message:
          "Donation already accepted",
      })
    }

    donation.acceptedBy = req.body.ngoId
    donation.status = "Accepted"

    await donation.save()

    res.json(donation)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const assignVolunteer = async (
  req,
  res
) => {
  try {
    const donation = await Donation.findById(
      req.params.id
    )

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      })
    }

    if (!donation.acceptedBy) {
      return res.status(400).json({
        message:
          "Donation must be accepted by NGO first",
      })
    }

    donation.assignedVolunteer =
      req.body.volunteerId

    donation.status =
      "Volunteer Assigned"

    await donation.save()

    res.json(donation)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getDonationById = async (
  req,
  res
) => {
  try {

    const donation =
      await Donation.findById(
        req.params.id
      )
        .populate(
          "donor",
          "name email"
        )
        .populate(
          "acceptedBy",
          "name email"
        )
        .populate(
          "assignedVolunteer",
          "name email"
        )

    if (!donation) {
      return res.status(404).json({
        message:
          "Donation not found",
      })
    }

    res.json(donation)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}