import { dev } from '$app/environment';
import { HARDWARE_INFO_DATA, HARDWARE_INFO_HISTORY_ENTRIES } from '@/dummy-data/HardwareInfoData';
import type { HardwareInfo, HardwareInfoHistoryEntry } from '@/types/hardware-types';

export const getRawHardwareInfo = (): HardwareInfo | undefined => {
	if (dev) {
		return HARDWARE_INFO_DATA();
	}

	// TODO: try catch if hardware info could not be read
};

export const getHardwareInfoHistoryData = (): HardwareInfoHistoryEntry[] => {
	if (dev) {
		return HARDWARE_INFO_HISTORY_ENTRIES;
	}

	return [];
};
