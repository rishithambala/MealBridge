import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-bold text-green-400">
              MealBridge
            </h2>

            <p className="mt-4 text-gray-300 leading-7">

              AI-powered food redistribution platform
              connecting donors, NGOs and volunteers
              to reduce food waste and fight hunger.

            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Platform
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                <Link
                  to="/"
                  className="hover:text-green-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-green-400"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/create-donation"
                  className="hover:text-green-400"
                >
                  Donate Food
                </Link>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Features
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>Food Donations</li>

              <li>AI Prediction</li>

              <li>Volunteer Network</li>

              <li>Impact Tracking</li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                📧 support@mealbridge.org
              </li>

              <li>
                🌍 India
              </li>

              <li>
                🤝 Community Driven
              </li>

            </ul>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">

          <p>
            © 2026 MealBridge. All rights reserved.
          </p>

          <p className="mt-2">
            Built with React, Node.js, MongoDB,
            Render, Vercel and Machine Learning.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer