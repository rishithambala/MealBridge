const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-white px-10"
    >

      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold text-green-600">
          About MealBridge
        </h2>

        <p className="mt-8 text-lg text-gray-700 leading-8">

          MealBridge is an AI-powered food donation platform
          designed to reduce food waste and support local
          community kitchens, NGOs, and volunteers.

        </p>

        <p className="mt-6 text-lg text-gray-700 leading-8">

          The platform connects restaurants, donors,
          volunteers, and organizations to ensure surplus
          food reaches people in need quickly and efficiently.

        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-green-50 p-6 rounded-2xl">

            <h3 className="text-2xl font-bold text-green-600">
              Smart Donations
            </h3>

            <p className="mt-4 text-gray-700">
              AI prioritization ensures urgent donations
              are handled first.
            </p>

          </div>

          <div className="bg-blue-50 p-6 rounded-2xl">

            <h3 className="text-2xl font-bold text-blue-600">
              Community Impact
            </h3>

            <p className="mt-4 text-gray-700">
              Supporting NGOs and community kitchens
              with real-time food distribution.
            </p>

          </div>

          <div className="bg-purple-50 p-6 rounded-2xl">

            <h3 className="text-2xl font-bold text-purple-600">
              AI Powered
            </h3>

            <p className="mt-4 text-gray-700">
              Machine learning predicts donation urgency
              and NGO demand.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}

export default About