export type CPUInfo = {
  usage: number; // in percentage
  // TODO: find a way to extract this
  // temperature: number; // in Celsius
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

export type ProcStatState = {
  cpu: ProcStatCPUState;
  perCore: ProcStatCPUState[];
}

export type ProcStatCPUState = {
  idle: number;
  nonIdle: number;
  total: number;
}

export type HardwareInfoHistoryEntry = {
  timestamp: number; // Unix timestamp
  hardwareInfo: HardwareInfo;
}