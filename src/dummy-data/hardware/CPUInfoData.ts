/**
 * Used to generate dummy sampel data read from /proc/stat
 *
 * @returns
 */
export const generateProcStatStringValue = (): string => {
	const totalCPU = generateCPUValues();
	// Generating per-CPU stats
	const perCPU = [];
	for (let i = 0; i < 8; i++) {
		perCPU.push(generateCPUValues());
	}

	// Format the output similar to /proc/stat
	const cpuLine = `cpu ${totalCPU.user} ${totalCPU.nice} ${totalCPU.system} ${totalCPU.idle} ${totalCPU.iowait} ${totalCPU.irq} ${totalCPU.softirq} ${totalCPU.steal} ${totalCPU.guest} ${totalCPU.guest_nice}`;

	let cpuLines = perCPU.map((cpu, index) => {
		return `cpu${index} ${cpu.user} ${cpu.nice} ${cpu.system} ${cpu.idle} ${cpu.iowait} ${cpu.irq} ${cpu.softirq} ${cpu.steal} ${cpu.guest} ${cpu.guest_nice}`;
	});

	// Additional stats (e.g., context switches, processes, softirqs)
	const contextSwitches = Math.floor(Math.random() * 1000000000);
	const bootTime = Math.floor(Math.random() * (1766054411 - 1700000000) + 1700000000); // Random boot time
	const processes = Math.floor(Math.random() * 50000) + 30000;
	const procsRunning = Math.floor(Math.random() * 10); // Up to 10 processes running
	const procsBlocked = Math.floor(Math.random() * 5); // Blocked processes

	const intr = Array.from({ length: 100 }).map(() => Math.floor(Math.random() * 10000)); // Random interrupt counts
	const softIrq = Array.from({ length: 10 }).map(() => Math.floor(Math.random() * 10000)); // Random softirq counts

	// Building the final output as a string
	const output = [
		cpuLine,
		...cpuLines,
		`ctxt ${contextSwitches}`,
		`btime ${bootTime}`,
		`processes ${processes}`,
		`procs_running ${procsRunning}`,
		`procs_blocked ${procsBlocked}`,
		`intr ${intr.join(' ')}`,
		`softirq ${softIrq.join(' ')}`
	];

	return output.join('\n');
};

/**
 * Helper function to generate dummy CPU values for history entries
 * Use this for cpu total and per core values
 *
 * @returns
 */
const generateCPUValues = () => {
	const total = Math.floor(Math.random() * 1000000000) + 500000000; // random total jiffies
	const idle = Math.floor(total * 0.5); // idle time is typically around 50%
	const user = Math.floor(total * 0.2); // user time is typically around 20%
	const system = Math.floor(total * 0.15); // system time is around 15%
	const iowait = Math.floor(total * 0.05); // iowait time is around 5%
	const irq = Math.floor(total * 0.03); // irq time is around 3%
	const softirq = Math.floor(total * 0.05); // softirq time is around 5%
	const steal = Math.floor(total * 0.02); // steal time is around 2%
	const guest = 0; // No guest time for simplicity
	const guest_nice = 0; // No guest nice time for simplicity

	return {
		total,
		user,
		nice: Math.floor(user * 0.05), // nice time as a small fraction of user time
		system,
		idle,
		iowait,
		irq,
		softirq,
		steal,
		guest,
		guest_nice
	};
};