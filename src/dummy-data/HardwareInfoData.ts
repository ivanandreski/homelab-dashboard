import type { HardwareInfo, HardwareInfoHistoryEntry } from '@/types/hardware-types';

export const HARDWARE_INFO_DATA = (): HardwareInfo => {
	return {
		cpu: {
			usage: Math.floor(Math.random() * 100),
			temperature: Math.floor(Math.random() * 100),
			coresUsage: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
		},
		memory: {
			usage: parseFloat((Math.random() * 16 * 1024 * 1024).toFixed(1)),
			total: 16 * 1024 * 1024
		}
	};
};

export const HARDWARE_INFO_HISTORY_ENTRIES: HardwareInfoHistoryEntry[] = [];
