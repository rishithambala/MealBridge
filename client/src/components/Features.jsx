const Features = () => {
  return (
    <section className="py-20 px-8 bg-white">

      <h2 className="text-4xl font-bold text-center text-gray-800">
        Why MealBridge?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-14">

        <div className="bg-gray-100 p-8 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-semibold text-green-600">
            Food Donation
          </h3>

          <p className="mt-4 text-gray-600">
            Restaurants and individuals can donate surplus food easily.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-semibold text-green-600">
            Smart Matching
          </h3>

          <p className="mt-4 text-gray-600">
            AI-based matching connects donations to nearby community kitchens.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-semibold text-green-600">
            Volunteer Support
          </h3>

          <p className="mt-4 text-gray-600">
            Volunteers help collect and deliver food quickly and safely.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Features