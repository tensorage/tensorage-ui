export interface Miner {
  id: number;
  pos: string;
  uid: string;
  stake: number;
  rank: number;
  updated: string;
  active: number;
  hotKey: string;
  coldKey: string;
  dailyReward: number;
  daily: number;
  total: number;
  vtrust: number;
  trust: number;
  consensus: number;
  incentive: number;
  dividends: number;
  emission: number;
  axon: string;
  capacity: number;
  axonInfo?: AxonInfo;
  type?: 'miner' | 'validator'
}
export interface AxonInfo {
  version: number;
  ip: string;
  port: number;
  ipType: number;
  hotkey: string;
  coldkey: string;
  protocol: number;
  placeholder1: number;
  placeholder2: number;
}

export interface Chunk {
  key: string;
  nTotalChunks: number;
  nMiners: number;
  nMinersWithChunks: number;
  miners: Miner[];
}

export interface StatsChartItem {
  label: string;
  value: number;
  color: string;
  chunk: Chunk;
}

export interface IOverview {
  nFiles: number;
  totalSpace: number;
  usedSpace: number;
  availableSpace: number;
}

export interface ChunkInfo {
  version: number;
  ip: string;
  port: number;
  ipType: number;
  hotkey: string;
  coldkey: string;
  protocol: number;
  placeholder1: number;
  placeholder2: number;
  key: number;
  chunkId?: number;
  chunkIdRowSpan?: number;
}

export interface ShardInfo {
  filename: string;
  nChunks: number;
  chunks: ChunkInfo[][];
  chunkTableData: ChunkInfo[];
}
