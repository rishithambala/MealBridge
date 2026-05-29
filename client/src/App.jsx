import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import DonationDetails from "./pages/DonationDetails"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CreateDonation from "./pages/CreateDonation"
import Donations from "./pages/Donations"
import AIPredict from "./pages/AIPredict"

import ScrollToTop from "./components/ScrollToTop"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-donation"
          element={
            <ProtectedRoute>
              <CreateDonation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <Donations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-predict"
          element={
            <ProtectedRoute>
              <AIPredict />
            </ProtectedRoute>
          }
        />

<Route
  path="/donation/:id"
  element={
    <ProtectedRoute>
      <DonationDetails />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App