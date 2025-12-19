import {
	getHardwareInfoHistoryData,
	getRawCPUInfo,
	getRawMemoryInfo
} from '@/data-provider/HardwareInfoDataProvider';
import { getRawMountData } from '@/dummy-data/hardware/StorageInfoData';
import type {
	CPUInfo,
	HardwareInfo,
	HardwareInfoHistoryEntry,
	MemoryInfo,
	ProcStatCPUState,
	ProcStatState
} from '@/types/hardware-types';

export const getHardwareInfo = (): HardwareInfo | undefined => {
	const cpuInfo = getCPUInfo();
	const memoryInfo = getMemoryInfo();

	return {
		cpu: cpuInfo!,
		memory: memoryInfo!
	};
};

export const getHardwareInfoHistory = (): HardwareInfoHistoryEntry[] => {
	return getHardwareInfoHistoryData();
};

// const getMountInfo = () => {
// 	const rawMountInfo = getRawMountData()!;
// 	const mountLines = rawMountInfo.split('\n');
// 	// TODO: async type
// 	const mounts = {};
// 	for (let i = 1; i < mountLines.length; i++) {
// 		const line = mountLines[i].trim();
// 		const lineValues = line.split(/\s+/);
// 		if (line) {
// 			const partition = lineValues[0];
// 			const used = parseInt(lineValues[2]);
// 			const total = parseInt(lineValues[3]);
// 			const mountPath = lineValues[5];

// 			mounts[partition] = {
// 				mountPath,
// 				used,
// 				total
// 			};
// 		}
// 	}

// 	// TODO: find drive name for each partition
// 	// FIND if ssd or hdd and fill the info
// };

const getMemoryInfo = (): MemoryInfo | undefined => {
	// TODO: handle errors
	const rawMemoryInfo = getRawMemoryInfo()!;
	const lines = rawMemoryInfo.split('\n');

	const totalMemoryLine = lines.find((line) => line.startsWith('MemTotal:'));
	const availableMemoryLine = lines.find((line) => line.startsWith('MemAvailable:'));

	if (!totalMemoryLine || !availableMemoryLine) {
		console.error('Failed to parse Memory info');
		return undefined;
	}

	const totalMemory = parseInt(totalMemoryLine.split(/\s+/)[1]); // in KB
	const availableMemory = parseInt(availableMemoryLine.split(/\s+/)[1]); // in KB
	const usedMemory = totalMemory - availableMemory;

	return {
		usage: usedMemory,
		total: totalMemory
	};
};

const getCPUInfo = (): CPUInfo | undefined => {
	// TODO: handle errors
	const rawCpuInfoInit = getRawCPUInfo()!;
	const parsedCpuInfo = parseCPUInfo(rawCpuInfoInit);

	const rawCpuInfoNextState = getRawCPUInfo()!;
	const parsedCpuInfoNextState = parseCPUInfo(rawCpuInfoNextState);

	if (!parsedCpuInfo || !parsedCpuInfoNextState) {
		console.error('Failed to parse CPU info');
		return undefined;
	}

	const cpuUsage = calculateCPUUsagePercentage(parsedCpuInfo.cpu, parsedCpuInfoNextState.cpu);
	const perCoreUsages: number[] = [];
	for (let i = 0; i < parsedCpuInfo.perCore.length; i++) {
		const coreUsage = calculateCPUUsagePercentage(
			parsedCpuInfo.perCore[i],
			parsedCpuInfoNextState.perCore[i]
		);
		perCoreUsages.push(coreUsage);
	}

	return {
		usage: cpuUsage,
		coresUsage: perCoreUsages
	};
};

const calculateCPUUsagePercentage = (
	prevState: ProcStatCPUState,
	nextState: ProcStatCPUState
): number => {
	const totalDiff = nextState.total - prevState.total;
	const idleDiff = nextState.idle - prevState.idle;
	const percentage = ((totalDiff - idleDiff) / totalDiff) * 100;

  return parseFloat(percentage.toFixed(2));
};

/**
 * Parses raw /proc/stat CPU info into structured data
 *
 * @param rawData
 * @returns
 */
const parseCPUInfo = (rawData: string): ProcStatState | undefined => {
	try {
		const lines = rawData.split('\n');
		const cpuLine = lines.find((line) => line.startsWith('cpu '));
		if (!cpuLine) {
			return;
		}

		const cpuCoreLines: string[] = [];
		let cpuCoreIndex = 0;
		while (true) {
			const coreLine = lines.find((line) => line.startsWith(`cpu${cpuCoreIndex} `));
			if (!coreLine) {
				break;
			}
			cpuCoreLines.push(coreLine);
			cpuCoreIndex++;
		}

		const cpuState = parseCPULine(cpuLine!);
		const perCoreStates = cpuCoreLines.map((line) => parseCPULine(line));

		return {
			cpu: cpuState,
			perCore: perCoreStates
		};
	} catch (error) {
		// TODO: introduce better logging
		console.error('Error parsing CPU info:', error);
	}
};

/**
 * Parses a single CPU line from /proc/stat
 *
 * @param line
 * @returns
 */
const parseCPULine = (line: string): ProcStatCPUState => {
	const parts = line.trim().split(/\s+/);
	const user = parseInt(parts[1]);
	const nice = parseInt(parts[2]);
	const system = parseInt(parts[3]);
	const idle = parseInt(parts[4]);
	const iowait = parseInt(parts[5]);
	const irq = parseInt(parts[6]);
	const softIrq = parseInt(parts[7]);
	const steal = parseInt(parts[8]);

	const idleTime = idle + iowait;
	const nonIdleTime = user + nice + system + irq + softIrq + steal;
	const totalTime = idleTime + nonIdleTime;

	return {
		idle: idleTime,
		nonIdle: nonIdleTime,
		total: totalTime
	};
};
