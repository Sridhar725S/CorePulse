export default function ClockCard({ time }) {
  return (
    <div className="glass stat-card clock-card">

      <div className="stat-header">
        Local Time
      </div>

      <div className="clock-value">
        {time}
      </div>

      <div className="clock-subtitle">
        Realtime System Clock
      </div>

    </div>
  )
}