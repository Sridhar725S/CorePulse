export default function StatCard({
  title,
  value,
  percent = 0
}) {
  return (
    <div className="glass stat-card">

      <div className="stat-header">
        <span>{title}</span>
      </div>

      <h2 className="stat-value">
        {value}
      </h2>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`
          }}
        />
      </div>

    </div>
  )
}