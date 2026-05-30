export namespace main {
	
	export class SystemStats {
	    cpu_percent: number;
	    ram_percent: number;
	    cpu_cores: number;
	    cpu_model: string;
	    total_ram: number;
	    used_ram: number;
	    disk_total: number;
	    disk_used: number;
	    disk_free: number;
	    processes: number;
	    bytes_sent: number;
	    bytes_recv: number;
	    upload_speed: number;
	    download_speed: number;
	    hostname: string;
	    platform: string;
	    os: string;
	    uptime: number;
	    time: string;
	
	    static createFrom(source: any = {}) {
	        return new SystemStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.cpu_percent = source["cpu_percent"];
	        this.ram_percent = source["ram_percent"];
	        this.cpu_cores = source["cpu_cores"];
	        this.cpu_model = source["cpu_model"];
	        this.total_ram = source["total_ram"];
	        this.used_ram = source["used_ram"];
	        this.disk_total = source["disk_total"];
	        this.disk_used = source["disk_used"];
	        this.disk_free = source["disk_free"];
	        this.processes = source["processes"];
	        this.bytes_sent = source["bytes_sent"];
	        this.bytes_recv = source["bytes_recv"];
	        this.upload_speed = source["upload_speed"];
	        this.download_speed = source["download_speed"];
	        this.hostname = source["hostname"];
	        this.platform = source["platform"];
	        this.os = source["os"];
	        this.uptime = source["uptime"];
	        this.time = source["time"];
	    }
	}

}

