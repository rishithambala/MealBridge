const Features = () => {
  return (
    <section className="py-24 px-6 md:px-10 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <span className="text-green-600 font-semibold uppercase tracking-wider">
            Platform Features
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Everything Needed to
            <span className="text-green-600">
              {" "}Reduce Food Waste
            </span>
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">

            MealBridge provides a complete ecosystem for food donation,
            coordination, delivery, and impact tracking.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">

            <div className="text-5xl mb-4">
              🍱
            </div>

            <h3 className="text-2xl font-bold text-green-600">
              Food Donations
            </h3>

            <p className="mt-4 text-gray-600 leading-7">

              Restaurants, donors and organizations
              can quickly donate surplus food through
              a simple and streamlined process.

            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">

            <div className="text-5xl mb-4">
              🤖
            </div>

            <h3 className="text-2xl font-bold text-green-600">
              AI Prioritization
            </h3>

            <p className="mt-4 text-gray-600 leading-7">

              Machine learning predicts donation
              urgency and helps prioritize food
              distribution efficiently.

            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">

            <div className="text-5xl mb-4">
              🚚
            </div>

            <h3 className="text-2xl font-bold text-green-600">
              Volunteer Network
            </h3>

            <p className="mt-4 text-gray-600 leading-7">

              Volunteers can accept assignments,
              pick up food, and update delivery
              progress in real time.

            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition">

            <div className="text-5xl mb-4">
              📊
            </div>

            <h3 className="text-2xl font-bold text-green-600">
              Impact Tracking
            </h3>

            <p className="mt-4 text-gray-600 leading-7">

              Monitor donations, meals delivered,
              volunteer activity and platform-wide
              impact metrics.

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-green-600 text-white p-8 rounded-3xl">

            <h3 className="text-3xl font-bold">
              Fast Distribution
            </h3>

            <p className="mt-4 leading-7">

              Connect donors and NGOs instantly
              to reduce delays and prevent food
              spoilage.

            </p>

          </div>

          <div className="bg-gray-900 text-white p-8 rounded-3xl">

            <h3 className="text-3xl font-bold">
              Secure Platform
            </h3>

            <p className="mt-4 leading-7">

              Role-based access ensures donors,
              NGOs and volunteers have a secure
              experience.

            </p>

          </div>

          <div className="bg-blue-600 text-white p-8 rounded-3xl">

            <h3 className="text-3xl font-bold">
              Scalable Solution
            </h3>

            <p className="mt-4 leading-7">

              Designed to support communities,
              cities and organizations at scale.

            </p>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Features