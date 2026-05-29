const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-white px-6 md:px-10"
    >

      <div className="max-w-6xl mx-auto">

        <div className="text-center">

          <span className="text-green-600 font-semibold uppercase tracking-wider">
            About MealBridge
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Bridging Surplus Food
            <span className="text-green-600">
              {" "}with Communities in Need
            </span>
          </h2>

          <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">

            Every day, thousands of meals go to waste while
            millions of people face food insecurity.
            MealBridge uses technology and intelligent
            coordination to connect donors, NGOs,
            volunteers, and community kitchens,
            ensuring food reaches those who need it most.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-green-50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition">

            <div className="text-5xl mb-4">
              🍱
            </div>

            <h3 className="text-2xl font-bold text-green-600">
              Smart Donations
            </h3>

            <p className="mt-4 text-gray-700 leading-7">

              Donors can quickly create food donations
              while the platform prioritizes urgent
              contributions for faster distribution.

            </p>

          </div>

          <div className="bg-blue-50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition">

            <div className="text-5xl mb-4">
              🤝
            </div>

            <h3 className="text-2xl font-bold text-blue-600">
              Community Impact
            </h3>

            <p className="mt-4 text-gray-700 leading-7">

              NGOs, community kitchens and volunteers
              collaborate through a single platform to
              reduce food waste and increase social impact.

            </p>

          </div>

          <div className="bg-purple-50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition">

            <div className="text-5xl mb-4">
              🤖
            </div>

            <h3 className="text-2xl font-bold text-purple-600">
              AI Powered
            </h3>

            <p className="mt-4 text-gray-700 leading-7">

              Machine learning models help prioritize
              donations and lay the foundation for future
              demand forecasting and smart NGO matching.

            </p>

          </div>

        </div>

        <div className="mt-24 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white p-12 text-center">

          <h3 className="text-4xl font-bold">

            Our Mission

          </h3>

          <p className="mt-6 text-lg max-w-3xl mx-auto leading-8">

            To create a sustainable ecosystem where
            surplus food is redirected efficiently,
            communities are empowered, and technology
            helps eliminate avoidable hunger.

          </p>

        </div>

      </div>

    </section>
  )
}

export default About