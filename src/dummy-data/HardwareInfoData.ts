import type { HardwareInfoHistoryEntry } from '@/types/hardware-types';
import { generateProcStatStringValue } from '@/dummy-data/hardware/CPUInfoData';
import { generateRandomMemoryValue } from '@/dummy-data/hardware/MemoryInfoData';
import { getRawHddModel, getRawIsRotational, getRawMountData } from './hardware/StorageInfoData';

export const RAW_CPU_DATA = (): string => generateProcStatStringValue();

export const RAW_MEMORY_DATA = (): string => generateRandomMemoryValue();

export const RAW_MOUNT_DATA = (): string => getRawMountData();

export const RAW_HDD_MODEL_DATA = (diskName: string): string => getRawHddModel(diskName);

export const RAW_IS_ROTATIONAL_DATA = (diskName: string): string => getRawIsRotational(diskName);

export const HARDWARE_INFO_HISTORY_ENTRIES: HardwareInfoHistoryEntry[] = [];
