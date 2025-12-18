export type CPUInfo = {
  usage: number; // in percentage
  temperature: number; // in Celsius
  coresUsage: number[]; // in percentage per core
}

export type MemoryInfo = {
  usage: number; // in KB
  total: number; // in KB
}

export type HardwareInfo = {
  cpu: CPUInfo;
  memory: MemoryInfo;
}

export type HardwareInfoHistoryEntry = {
  timestamp: number; // Unix timestamp
  hardwareInfo: HardwareInfo;
}