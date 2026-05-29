import express from "express"


import {
createDonation,
getDonations,
getMyDonations,
getVolunteerDeliveries,
getNGODonations,
updateDonationStatus,
acceptDonation,
assignVolunteer,
getDonationById,
} from "../controllers/donationController.js"

const router = express.Router()

router
.route("/")
.post(createDonation)
.get(getDonations)

router.get(
"/my/:userId",
getMyDonations
)

router.get(
"/volunteer/:userId",
getVolunteerDeliveries
)

router.get(
"/ngo/:userId",
getNGODonations
)

router.get(
  "/:id",
  getDonationById
)

router.patch(
"/:id",
updateDonationStatus
)

router.patch(
"/:id/accept",
acceptDonation
)

router.patch(
"/:id/assign",
assignVolunteer
)

export default router
