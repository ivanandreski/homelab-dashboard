import { getHardwareInfoHistoryData, getRawHardwareInfo } from '@/data-provider/HardwareInfoDataProvider';
import type { HardwareInfo, HardwareInfoHistoryEntry } from '@/types/hardware-types';

// const parseHardwareInfo = (): HardwareInfo => {
//   // TODO: Once i get reliable data from real hardware, parse and return it here
//   return {
//     cpu: {
//       usage: 0,
//       temperature: 0,
//       coresUsage: []
//     },
//     memory: {
//       usage: 0,
//       total: 0
//     }
//   };
// }

export const getHardwareInfo = (): HardwareInfo | undefined => {
  // TODO: handle errors
  return getRawHardwareInfo();
}

export const getHardwareInfoHistory = (): HardwareInfoHistoryEntry[] => {
  return getHardwareInfoHistoryData();
}