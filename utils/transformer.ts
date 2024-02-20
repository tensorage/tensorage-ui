import {
  AxonInfo,
  Chunk,
  ChunkInfo,
  IOverview,
  Miner,
  ShardInfo,
  StatsChartItem,
} from './common';
import _sumBy from 'lodash/sumBy';
import _flatMap from 'lodash/flatMap';
import { calculatePercentage } from './number';
import { getRandomDarkColor } from './color';

export function transformMiner(jsonPayload: any): Miner {
  const transformedData: Miner = {
    id: jsonPayload.netuid || 0,
    pos: (jsonPayload.uid || 0).toString(),
    uid: jsonPayload.uid || 0,
    stake: jsonPayload.stake?.rao
      ? jsonPayload.stake?.rao / Math.pow(10, 9)
      : 0,
    rank: jsonPayload.rank || 0,
    updated: jsonPayload.last_update?.toString() || '',
    active: jsonPayload.active ? 1 : 0,
    hotKey: jsonPayload.hotkey || '',
    coldKey: jsonPayload.coldkey || '',
    dailyReward: 0, // Define based on available data
    daily: 0, // Define based on available data
    total: jsonPayload.total_stake?.rao || 0,
    vtrust: jsonPayload.validator_trust || 0,
    trust: jsonPayload.trust || 0,
    consensus: jsonPayload.consensus || 0,
    incentive: jsonPayload.incentive || 0,
    dividends: jsonPayload.dividends || 0,
    emission: jsonPayload.emission || 0,
    axon: transformAxon(jsonPayload.axon_info?.ip || '0.0.0.0'),
    capacity: !isNaN(jsonPayload.n_chunks) ? jsonPayload.n_chunks : 0,
    axonInfo: transformAxonInfo(jsonPayload.axon_info),
    type: (jsonPayload.validator_trust || 0) > 0 ? 'validator' : 'miner',
  };

  return transformedData;
}

export function transformChunk(key: string, jsonPayload: any): Chunk {
  const transformedData: Chunk = {
    key,
    nTotalChunks: jsonPayload?.n_total_chunks || 0,
    nMiners: jsonPayload?.n_miners || 0,
    nMinersWithChunks: jsonPayload?.n_miners_with_chunks || 0,
    miners: jsonPayload?.miners
      ? jsonPayload.miners.map((item) => transformMiner(item))
      : [],
  };

  return transformedData;
}

function transformAxon(ip: string): string {
  const defaultMaskedIP = '0.0.0.0xx.xx';

  if (ip === '0.0.0.0') {
    return defaultMaskedIP;
  }

  const parts = ip.split('.');
  const maskedIP = `${parts[0]}.${parts[1]}xx.xx`;

  return maskedIP;
}

function transformAxonInfo(jsonPayload: any): AxonInfo {
  const transformedData: AxonInfo = {
    version: jsonPayload?.version || 0,
    ip: jsonPayload?.ip || '',
    port: jsonPayload?.port || 0,
    ipType: jsonPayload?.ip_type || 0,
    hotkey: jsonPayload?.hotkey || '',
    coldkey: jsonPayload?.coldkey || '',
    protocol: jsonPayload?.protocol || 0,
    placeholder1: jsonPayload?.placeholder1 || 0,
    placeholder2: jsonPayload?.placeholder2 || 0,
  };
  return transformedData;
}

export function transformStats(chunks: Chunk[]): StatsChartItem[] {
  const totalNumOfChunks = _sumBy(chunks, (chunk) => chunk.nTotalChunks);

  return chunks.map((chunk) => ({
    label: chunk.key,
    value: calculatePercentage(chunk.nTotalChunks, totalNumOfChunks),
    color: getRandomDarkColor(),
    chunk,
  }));
}

export function transformOverviewData(jsonPayload: any): IOverview {
  return {
    nFiles: jsonPayload?.n_files || 0,
    totalSpace: jsonPayload?.n_total_chunks || 0,
    usedSpace: jsonPayload?.n_used_chunks || 0,
    availableSpace:
      (jsonPayload?.n_total_chunks || 0) - (jsonPayload?.n_used_chunks || 0),
  };
}

export function transformShardInfo(jsonData: any): ShardInfo {
  const transformedData: ShardInfo = {
    filename: jsonData.filename,
    nChunks: jsonData.n_chunks,
    chunks: jsonData.chunks.map((chunkArray: any[]) => {
      return chunkArray.map((chunkData: any) => {
        return {
          version: chunkData.version,
          ip: chunkData.ip,
          port: chunkData.port,
          ipType: chunkData.ip_type,
          hotkey: chunkData.hotkey,
          coldkey: chunkData.coldkey,
          protocol: chunkData.protocol,
          placeholder1: chunkData.placeholder1,
          placeholder2: chunkData.placeholder2,
          key: chunkData.key,
        } as ChunkInfo;
      });
    }),
    chunkTableData: _flatMap(
      jsonData.chunks.map((chunkArray: any[]) => {
        const rowSpan = chunkArray.length;
        return chunkArray.map((chunkData: any, index: number) => {
          if (index == 0) {
            return {
              chunkIdRowSpan: rowSpan,
              chunkId: index,
              version: chunkData.version,
              ip: chunkData.ip,
              port: chunkData.port,
              ipType: chunkData.ip_type,
              hotkey: chunkData.hotkey,
              coldkey: chunkData.coldkey,
              protocol: chunkData.protocol,
              placeholder1: chunkData.placeholder1,
              placeholder2: chunkData.placeholder2,
              key: chunkData.key,
            } as ChunkInfo;
          }
          return {
            chunkId: index,
            version: chunkData.version,
            ip: chunkData.ip,
            port: chunkData.port,
            ipType: chunkData.ip_type,
            hotkey: chunkData.hotkey,
            coldkey: chunkData.coldkey,
            protocol: chunkData.protocol,
            placeholder1: chunkData.placeholder1,
            placeholder2: chunkData.placeholder2,
            key: chunkData.key,
          } as ChunkInfo;
        });
      })
    ),
  };
  return transformedData;
}
