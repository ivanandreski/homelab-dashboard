import { HARDWARE_INFO_HISTORY_ENTRIES } from "./dummy-data/HardwareInfoData";
import { getHardwareInfo } from "@/service/HardwareMonitorService";

// On dev you need to do an init request for this to start working
// Check if prod will run on app start
const writeHardwareInfoHistory = setInterval(() => {
  const currentTimestamp = Date.now();
  
  HARDWARE_INFO_HISTORY_ENTRIES.push({
    timestamp: currentTimestamp,
    hardwareInfo: getHardwareInfo()!
  });
}, 1000);