import { Link } from "react-router-dom"
const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-green-50 to-white">

      <h1 className="text-6xl font-bold text-green-600 leading-tight">
        Reduce Food Waste.
        <br />
        Feed More Lives.
      </h1>

      <p className="mt-6 text-lg text-gray-700 max-w-2xl">
        MealBridge connects restaurants, donors, volunteers, and
        community kitchens to ensure surplus food reaches people in need.
      </p>

<div className="mt-8 flex gap-4 flex-wrap justify-center">

  <Link to="/create-donation">
    <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
      Donate Food
    </button>
  </Link>

<a href="#about">
  <button className="border border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition">
    Learn More
  </button>
</a>

</div>

    </section>
  )
}

export default Hero