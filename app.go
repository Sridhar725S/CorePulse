package main

import (
	"context"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
	"github.com/shirou/gopsutil/v3/net"
	"github.com/shirou/gopsutil/v3/process"
)

type SystemStats struct {
	CPUPercent float64 `json:"cpu_percent"`
	RAMPercent float64 `json:"ram_percent"`

	CPUCores int    `json:"cpu_cores"`
	CPUModel string `json:"cpu_model"`

	TotalRAM uint64 `json:"total_ram"`
	UsedRAM  uint64 `json:"used_ram"`

	DiskTotal uint64 `json:"disk_total"`
	DiskUsed  uint64 `json:"disk_used"`
	DiskFree  uint64 `json:"disk_free"`

	Processes int `json:"processes"`

	BytesSent uint64 `json:"bytes_sent"`
	BytesRecv uint64 `json:"bytes_recv"`

	UploadSpeed   float64 `json:"upload_speed"`
	DownloadSpeed float64 `json:"download_speed"`

	Hostname string `json:"hostname"`
	Platform string `json:"platform"`
	OS       string `json:"os"`

	Uptime uint64 `json:"uptime"`
	Time   string `json:"time"`
}

type App struct {
	ctx context.Context

	lastSent uint64
	lastRecv uint64
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// ===============================
// MAIN STATS FUNCTION
// ===============================

func (a *App) GetStats() SystemStats {

	// RAM
	vm, err := mem.VirtualMemory()
	if err != nil {
		vm = &mem.VirtualMemoryStat{}
	}

	// CPU usage
	cpuPercent, _ := cpu.Percent(500*time.Millisecond, false)

	var cpuUsage float64
	if len(cpuPercent) > 0 {
		cpuUsage = cpuPercent[0]
	}

	// CPU info (cores + model)
	cpuInfos, _ := cpu.Info()
	cores := 0
	model := ""

	if len(cpuInfos) > 0 {
		cores = int(cpuInfos[0].Cores)
		model = cpuInfos[0].ModelName
	}

	// DISK
	diskStat, err := disk.Usage("/")
	if err != nil {
		diskStat = &disk.UsageStat{}
	}

	// NETWORK
	netIO, err := net.IOCounters(false)
	if err != nil || len(netIO) == 0 {
		netIO = []net.IOCountersStat{{}}
	}

	uploadSpeed := 0.0
	downloadSpeed := 0.0

	if len(netIO) > 0 {

		currentSent := netIO[0].BytesSent
		currentRecv := netIO[0].BytesRecv

		if a.lastSent != 0 {
			uploadSpeed =
				float64(currentSent-a.lastSent) / 1024
		}

		if a.lastRecv != 0 {
			downloadSpeed =
				float64(currentRecv-a.lastRecv) / 1024
		}

		a.lastSent = currentSent
		a.lastRecv = currentRecv
	}

	// HOST
	hostInfo, _ := host.Info()

	// PROCESSES
	procs, _ := process.Processes()
	processCount := len(procs)

	return SystemStats{
		CPUPercent: cpuUsage,
		RAMPercent: vm.UsedPercent,

		CPUCores: cores,
		CPUModel: model,

		TotalRAM: vm.Total,
		UsedRAM:  vm.Used,

		DiskTotal: diskStat.Total,
		DiskUsed:  diskStat.Used,
		DiskFree:  diskStat.Free,

		Processes: processCount,

		BytesSent: netIO[0].BytesSent,
		BytesRecv: netIO[0].BytesRecv,

		UploadSpeed:   uploadSpeed,
		DownloadSpeed: downloadSpeed,

		Hostname: hostInfo.Hostname,
		Platform: hostInfo.Platform,
		OS:       hostInfo.OS,

		Uptime: hostInfo.Uptime,
		Time:   time.Now().Format("15:04:05"),
	}
}
