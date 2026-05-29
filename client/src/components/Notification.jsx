const Notification = ({ message, type }) => {

  if (!message) return null

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-lg text-white
      ${
        type === "success"
          ? "bg-green-600"
          : "bg-red-500"
      }`}
    >
      {message}
    </div>
  )
}

export default Notification