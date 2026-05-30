import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function CpuChart({ data }) {

  return (

    <div className="glass p-5 rounded-3xl h-[400px]">

      <h2 className="mb-4 text-cyan-300 text-xl">
        CPU Activity
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <LineChart data={data}>

          <CartesianGrid stroke="#1e293b" />

          <XAxis dataKey="time" />

          <YAxis domain={[0,100]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )
}