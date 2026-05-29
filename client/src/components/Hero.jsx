import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-green-50 via-white to-green-100">

      <div className="max-w-5xl">

        <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium mb-6">
          🌍 AI-Powered Food Redistribution Platform
        </span>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">

          Reduce Food Waste.
          <br />

          <span className="text-green-600">
            Feed More Lives.
          </span>

        </h1>

        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">

          MealBridge connects donors, restaurants, NGOs and volunteers
          through an intelligent platform that ensures surplus food
          reaches communities in need quickly and efficiently.

        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">

          <Link to="/create-donation">

            <button className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition shadow-lg">

              Donate Food

            </button>

          </Link>

          <a href="#about">

            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition">

              Learn More

            </button>

          </a>

        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-3xl font-bold text-green-600">
              500+
            </h3>

            <p className="text-gray-600 mt-2">
              Meals Donated
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-3xl font-bold text-green-600">
              100+
            </h3>

            <p className="text-gray-600 mt-2">
              Donations
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-3xl font-bold text-green-600">
              25+
            </h3>

            <p className="text-gray-600 mt-2">
              Volunteers
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-3xl font-bold text-green-600">
              15+
            </h3>

            <p className="text-gray-600 mt-2">
              NGOs
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero