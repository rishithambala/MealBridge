import { useState } from "react"
import axios from "axios"
import MainLayout from "../layouts/MainLayout"

const AIPredict = () => {

  const [mealsRequired, setMealsRequired] = useState("")
  const [peopleServed, setPeopleServed] = useState("")
  const [prediction, setPrediction] = useState("")

  const predictHandler = async (e) => {

    e.preventDefault()

    try {

      const { data } = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          meals_required: Number(mealsRequired),
          people_served: Number(peopleServed),
        }
      )

      setPrediction(data.priority)

    } catch (error) {

      console.log(error)

      alert("AI Prediction Failed")

    }
  }

  return (
<MainLayout>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={predictHandler}
        className="bg-white p-8 rounded-2xl shadow-md w-[450px]"
      >

        <h1 className="text-3xl font-bold text-green-600 mb-6">
          AI NGO Priority Prediction
        </h1>

        <input
          type="number"
          placeholder="Meals Required"
          className="w-full border p-3 rounded-lg mb-4"
          value={mealsRequired}
          onChange={(e) => setMealsRequired(e.target.value)}
        />

        <input
          type="number"
          placeholder="People Served"
          className="w-full border p-3 rounded-lg mb-4"
          value={peopleServed}
          onChange={(e) => setPeopleServed(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Predict Priority
        </button>

        {prediction && (

          <div className="mt-6 text-center">

            <h2 className="text-2xl font-bold">
              Predicted Priority:
            </h2>

            <p
              className={
                prediction === "High"
                  ? "text-red-600 text-3xl font-bold mt-3"
                  : prediction === "Medium"
                  ? "text-yellow-600 text-3xl font-bold mt-3"
                  : "text-green-600 text-3xl font-bold mt-3"
              }
            >
              {prediction}
            </p>

          </div>

        )}

      </form>

    </div>
</MainLayout>
  )
}

export default AIPredict