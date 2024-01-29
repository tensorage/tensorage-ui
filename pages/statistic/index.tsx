import { useState } from 'react';
import StatisticChart from 'components/StatisticChart';
import { Panel, Row } from 'rsuite';
import { useStats } from 'hooks/useStats';
import MetagraphTable from 'components/MetagraphTable';
import { StatsChartItem } from 'utils/common';
import MapWithIPs from 'components/CustomMap';

const StorePage = () => {
  const { loading, data, error } = useStats();
  const [selectStatsItem, setSelectedStatsItem] =
    useState<StatsChartItem>(null);

  const handlePointClick = (event, chartContext, config) => {
    const clickedIndex = config.dataPointIndex;
    setSelectedStatsItem(data[clickedIndex]);
  };

  return (
    <Panel>
      <Row className='pt-16'>
        <StatisticChart
          data={data}
          onPointClick={handlePointClick}
          loading={loading}
        />
      </Row>

      {selectStatsItem && (
        <Row className='mt-8'>
          <MetagraphTable
            loading={loading}
            limit={selectStatsItem.chunk.miners.length}
            data={selectStatsItem.chunk.miners}
            columns={[
              'UID',
              'CAPACITY',
              'STAKE',
              'RANK',
              'CONSENSUS',
              'INCENTIVE',
              'EMISSION',
              'UPDATED',
              'ACTIVE',
              'AXON',
              'COLD_KEY',
              'HOT_KEY',
            ]}
            showPagination={false}
          />
        </Row>
      )}
    </Panel>
  );
};

export default StorePage;
