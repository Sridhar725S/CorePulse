import { useEffect, useState } from "react"
import { GetStats } from "../wailsjs/go/main/App"

import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import StatCard from "./components/StatCard"
import CpuChart from "./components/CpuChart"
import RamChart from "./components/RamChart"
import ClockCard from "./components/ClockCard"
import NetworkCard from "./components/NetworkCard"
import HealthCard from './components/HealthCard'

function App() {

  const [stats, setStats] = useState({})
  const [history, setHistory] = useState([])

  useEffect(() => {

    const load = async () => {
      try {

        const data = await GetStats()

        setStats(data)

        setHistory(prev => [
          ...prev.slice(-50),
          {
            time: data.time,
            cpu: data.cpu_percent || 0,
            ram: data.ram_percent || 0
          }
        ])

      } catch (err) {
        console.log("GetStats error:", err)
      }
    }

    load()
    const timer = setInterval(load, 1000)

    return () => clearInterval(timer)

  }, [])

  const healthStatus =
  stats.cpu_percent > 90 ||
  stats.ram_percent > 95
    ? "Critical"
    : stats.cpu_percent > 75 ||
      stats.ram_percent > 85
    ? "Warning"
    : "Healthy"

  return (
    <div className="app-layout">

      

      <div className="main-content">

        <Topbar />

        <div className="dashboard-content">

          <div className="stats-grid">

  <StatCard
  title="CPU Usage"
  value={`${stats.cpu_percent?.toFixed(1) || 0}%`}
  percent={stats.cpu_percent || 0}
/>

  <StatCard
  title="RAM Usage"
  value={`${stats.ram_percent?.toFixed(1) || 0}%`}
  percent={stats.ram_percent || 0}
/>

  <StatCard
  title="Disk Usage"
  value={`${(
    ((stats.disk_used || 0) /
    (stats.disk_total || 1)) * 100
  ).toFixed(1)}%`}
  percent={
    ((stats.disk_used || 0) /
    (stats.disk_total || 1)) * 100
  }
/>
<StatCard
 title="Download"
 value={`${stats.download_speed?.toFixed(1) || 0} KB/s`}
/>

<StatCard
 title="Upload"
 value={`${stats.upload_speed?.toFixed(1) || 0} KB/s`}
/>

  <StatCard
    title="Processes"
    value={stats.processes || 0}
  />

  <ClockCard
    time={stats.time || '--:--:--'}
  />

  <StatCard
 title="Used RAM"
 value={`${(
  (stats.used_ram || 0) /
  1024 / 1024 / 1024
 ).toFixed(1)} GB`}
/>

  <NetworkCard
  upload={(
    (stats.bytes_sent || 0) /
    1024 /
    1024
  ).toFixed(1)}

  download={(
    (stats.bytes_recv || 0) /
    1024 /
    1024
  ).toFixed(1)}

  uploadSpeed={
    stats.upload_speed || 0
  }

  downloadSpeed={
    stats.download_speed || 0
  }
/>
</div>

          <div className="charts-grid">

            <CpuChart data={history} />
            <RamChart data={history} />

          </div>

          <div className="glass system-card">

  <h2 className="text-2xl font-bold mb-6">
    System Information
  </h2>

  <div className="system-grid">

    <div>
      <span>Hostname</span>
      <strong>{stats.hostname}</strong>
    </div>

    <div>
      <span>OS</span>
      <strong>{stats.os}</strong>
    </div>

    <div>
      <span>Platform</span>
      <strong>{stats.platform}</strong>
    </div>

    <div>
      <span>CPU</span>
      <strong>{stats.cpu_model}</strong>
    </div>

    <div>
      <span>Cores</span>
      <strong>{stats.cpu_cores}</strong>
    </div>

    <div>
      <span>Processes</span>
      <strong>{stats.processes}</strong>
    </div>

    <div>
      <span>Disk Used</span>
      <strong>
        {(
          (stats.disk_used || 0) /
          1024 /
          1024 /
          1024
        ).toFixed(1)}
        GB
      </strong>
    </div>

    <div>
      <span>Disk Total</span>
      <strong>
        {(
          (stats.disk_total || 0) /
          1024 /
          1024 /
          1024
        ).toFixed(1)}
        GB
      </strong>
    </div>

    <div>
  <span>Total RAM</span>
  <strong>
    {(
      (stats.total_ram || 0) /
      1024 /
      1024 /
      1024
    ).toFixed(1)} GB
  </strong>
</div>

<div>
  <span>Used RAM</span>
  <strong>
    {(
      (stats.used_ram || 0) /
      1024 /
      1024 /
      1024
    ).toFixed(1)} GB
  </strong>
</div>

    <div>
      <span>Uptime</span>
      <strong>
        {Math.floor(
          (stats.uptime || 0) / 3600
        )} hrs
      </strong>
    </div>

  </div>

</div>

        </div>
      
      <div className="footer-bar">

  <div className="footer-left">
    <span className="status-dot"></span>
    Connected
  </div>

  <div className="footer-center">
    Refresh: 1s
  </div>

  <div className="footer-right">
    Last Update: {stats.time || "--:--:--"}
  </div>

</div>
      </div>

    </div>
  )
}

export default App