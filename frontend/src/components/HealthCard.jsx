export default function HealthCard({
  status
}) {

  const color =
    status === "Critical"
      ? "text-red-400"
      : status === "Warning"
      ? "text-yellow-400"
      : "text-green-400"

  return (

    <div className="glass p-6">

      <p className="text-gray-400">
        System Health
      </p>

      <h2
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {status}
      </h2>

    </div>

  )
}