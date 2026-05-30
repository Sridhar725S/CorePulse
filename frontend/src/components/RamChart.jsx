import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function RamChart({ data }) {
  return (

    <div className="
      glass
      rounded-3xl
      p-5
      h-[400px]
      w-full
    ">

      <h2 className="
        text-xl
        font-bold
        mb-5
        text-violet-300
      ">
        RAM Usage
      </h2>

      <div
  style={{
    width: '95%',
    height: '320px'
  }}
>

        <ResponsiveContainer width="100%" height="100%">

  <AreaChart data={data}>

    <CartesianGrid
      strokeDasharray="3 3"
      stroke="#1e293b"
    />

    <XAxis
      dataKey="time"
      stroke="#94a3b8"
    />

    <YAxis
      domain={[70, 100]}
      stroke="#ffffff"
    />

    <Tooltip
      contentStyle={{
        background: '#111827',
        border: 'none',
        borderRadius: '12px',
        color: '#fff'
      }}
    />

    <Area
      type="monotone"
      dataKey="ram"
      stroke="#c084fc"
      fill="#8b5cf6"
      fillOpacity={0.4}
      strokeWidth={4}
      dot={false}
      activeDot={{ r: 6 }}
      isAnimationActive={true}
      animationDuration={500}
    />

  </AreaChart>

</ResponsiveContainer>

      </div>

    </div>
  )
}