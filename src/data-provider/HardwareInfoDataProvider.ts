import { dev } from '$app/environment';
import {
	RAW_CPU_DATA,
	HARDWARE_INFO_HISTORY_ENTRIES,
	RAW_MEMORY_DATA,
	RAW_MOUNT_DATA,
	RAW_HDD_MODEL_DATA,
	RAW_IS_ROTATIONAL_DATA
} from '@/dummy-data/HardwareInfoData';
import type { HardwareInfoHistoryEntry } from '@/types/hardware-types';

export const getRawCPUInfo = (): string | undefined => {
	if (dev) {
		return RAW_CPU_DATA();
	}

	// TODO: try catch if hardware info could not be read
};

export const getRawMemoryInfo = (): string | undefined => {
	if (dev) {
		return RAW_MEMORY_DATA();
	}
	// TODO: try catch if hardware info could not be read
};

export const getRawMountInfo = (): string | undefined => {
	if (dev) {
		return RAW_MOUNT_DATA();
	}
	// TODO: try catch if hardware info could not be read
};

export const getRawDiskModelInfo = (diskName: string): string | undefined => {
	if (dev) {
		return RAW_HDD_MODEL_DATA(diskName);
	}
	// TODO: try catch if hardware info could not be read
};

export const getRawIsRotationalInfo = (diskName: string): string | undefined => {
	if (dev) {
		return RAW_IS_ROTATIONAL_DATA(diskName);
	}
	// TODO: try catch if hardware info could not be read
};

export const getHardwareInfoHistoryData = (): HardwareInfoHistoryEntry[] => {
	if (dev) {
		return HARDWARE_INFO_HISTORY_ENTRIES;
	}

	return [];
};
