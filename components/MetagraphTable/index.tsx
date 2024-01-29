import { filter } from 'lodash';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { Pagination, Table } from 'rsuite';
import { Miner } from 'utils/common';
import { TAO_STATS_ACCOUNT } from 'utils/constants';
import {
  calculateSpaceInMB,
  formatCurrency,
  formatNumber,
  formatStorage,
  truncateDecimals,
} from 'utils/number';

const { Column, HeaderCell, Cell } = Table;

export interface MetagraphTableProps {
  searchKeyword?: string;
  limit?: number;
  columns: AvailableColumn[];
  data: Miner[];
  loading: boolean;
  showPagination?: boolean;
}

export type AvailableColumn =
  | 'POS'
  | 'UID'
  | 'STAKE'
  | 'RANK'
  | 'TRUST'
  | 'VTRUST'
  | 'CONSENSUS'
  | 'INCENTIVE'
  | 'DIVIDENDS'
  | 'EMISSION'
  | 'UPDATED'
  | 'ACTIVE'
  | 'AXON'
  | 'COLD_KEY'
  | 'HOT_KEY'
  | 'DAILY_REWARD'
  | 'DAILY'
  | 'TOTAL'
  | 'CAPACITY';

const MetagraphTable = ({
  searchKeyword,
  limit = 10,
  columns = [],
  data,
  loading,
  showPagination = true,
}: MetagraphTableProps) => {
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [dataSize, setDataSize] = useState<number>(0);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
  };

  const filteredData = useMemo<Miner[]>(() => {
    let filtered = data.filter((item: Miner) => {
      if (!searchKeyword) {
        return true;
      }

      // Convert object values to string and perform case-insensitive search
      const searchStr = searchKeyword.toLowerCase();
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = String(item[key]).toLowerCase();
          if (value.includes(searchStr)) {
            return true;
          }
        }
      }

      return false;
    });
    setDataSize(filtered.length);

    if (sortColumn && sortType) {
      filtered.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];
        // Check if x and y are strings
        if (typeof x === 'string' && typeof y === 'string') {
          if (sortType === 'asc') {
            return x.localeCompare(y); // Sort strings alphabetically
          } else {
            return y.localeCompare(x); // Sort strings in reverse order
          }
        }

        // Check if x and y are numbers
        if (typeof x === 'number' && typeof y === 'number') {
          if (sortType === 'asc') {
            return x - y; // Sort numbers in ascending order
          } else {
            return y - x; // Sort numbers in descending order
          }
        }

        return 0;
      });
    }

    filtered = filtered.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });

    return filtered;
  }, [data, searchKeyword, sortColumn, sortType, page, limit]);

  const handleSortColumn = (sortColumn, sortType) => {
    setTimeout(() => {
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <div>
      <Table
        loading={loading}
        height={420}
        data={filteredData}
        translate3d={false}
        autoHeight
        affixHeader
        affixHorizontalScrollbar
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        {columns.includes('POS') && (
          <Column width={60} align='center' sortable resizable={false}>
            <HeaderCell>POS</HeaderCell>
            <Cell dataKey='pos' className='white-cell' />
          </Column>
        )}

        {columns.includes('UID') && (
          <Column width={60} sortable resizable={false}>
            <HeaderCell>UID</HeaderCell>
            <Cell dataKey='uid' className='green-cell' />
          </Column>
        )}

        {columns.includes('CAPACITY') && (
          <Column width={120} sortable resizable={false}>
            <HeaderCell>CAPACITY(MB)</HeaderCell>
            <Cell dataKey='capacity' className='green-cell'>
              {(rowData) =>
                `${formatStorage(calculateSpaceInMB(rowData.capacity || 0))}`
              }
            </Cell>
          </Column>
        )}

        {columns.includes('STAKE') && (
          <Column width={80} sortable resizable={false}>
            <HeaderCell>STAKE</HeaderCell>
            <Cell dataKey='stake' className='organe-cell'>
              {(rowData) => `${truncateDecimals(rowData.stake, 3)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('RANK') && (
          <Column width={60} sortable resizable={false}>
            <HeaderCell>RANK</HeaderCell>
            <Cell dataKey='rank'>
              {(rowData) => `${formatNumber(rowData.rank, 0)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('TRUST') && (
          <Column width={80} sortable resizable={false}>
            <HeaderCell>TRUST</HeaderCell>
            <Cell dataKey='trust'>
              {(rowData) => `${formatNumber(rowData.trust, 5)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('VTRUST') && (
          <Column width={80} sortable resizable={false}>
            <HeaderCell>VTRUST</HeaderCell>
            <Cell dataKey='vtrust'>
              {(rowData) => `${formatNumber(rowData.vtrust, 5)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('CONSENSUS') && (
          <Column width={130} sortable resizable={false}>
            <HeaderCell>CONSENSUS</HeaderCell>
            <Cell dataKey='consensus'>
              {(rowData) => `${formatNumber(rowData.consensus, 5)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('INCENTIVE') && (
          <Column width={120} sortable resizable={false}>
            <HeaderCell>INCENTIVE</HeaderCell>
            <Cell dataKey='incentive'>
              {(rowData) => `${formatNumber(rowData.incentive, 5)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('DIVIDENDS') && (
          <Column width={120} sortable resizable={false}>
            <HeaderCell>DIVIDENDS</HeaderCell>
            <Cell dataKey='dividends'>
              {(rowData) => `${formatNumber(rowData.dividends, 5)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('EMISSION') && (
          <Column width={120} sortable resizable={false}>
            <HeaderCell>EMISSION(P)</HeaderCell>
            <Cell dataKey='emission'>
              {(rowData) => `${formatNumber(rowData.emission, 5)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('UPDATED') && (
          <Column width={100} sortable resizable={false}>
            <HeaderCell>UPDATED</HeaderCell>
            <Cell dataKey='updated' className='white-cell' />
          </Column>
        )}

        {columns.includes('ACTIVE') && (
          <Column width={70} sortable resizable={false}>
            <HeaderCell>ACTIVE</HeaderCell>
            <Cell dataKey='active' />
          </Column>
        )}

        {columns.includes('AXON') && (
          <Column width={100} sortable resizable={false}>
            <HeaderCell>AXON</HeaderCell>
            <Cell dataKey='axon' />
          </Column>
        )}
        {columns.includes('HOT_KEY') && (
          <Column minWidth={130} flexGrow={1} sortable resizable={false}>
            <HeaderCell>HOT KEY</HeaderCell>
            <Cell dataKey='hotKey' className='white-cell'>
              {(rowData) => (
                <Link href={`${TAO_STATS_ACCOUNT}/${rowData.hotKey}`}>
                  {rowData.hotKey}
                </Link>
              )}
            </Cell>
          </Column>
        )}

        {columns.includes('COLD_KEY') && (
          <Column minWidth={130} flexGrow={1} sortable resizable={false}>
            <HeaderCell>COLD KEY</HeaderCell>
            <Cell dataKey='coldKey' className='white-cell'>
              {(rowData) => (
                <Link href={`${TAO_STATS_ACCOUNT}/${rowData.coldKey}`}>
                  {rowData.coldKey}
                </Link>
              )}
            </Cell>
          </Column>
        )}

        {columns.includes('DAILY_REWARD') && (
          <Column width={130} sortable resizable={false}>
            <HeaderCell>DAILY REWARD</HeaderCell>
            <Cell dataKey='dailyReward' className='organe-cell'>
              {(rowData) => `${formatCurrency(rowData.dailyReward, 3)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('DAILY') && (
          <Column width={80} sortable resizable={false}>
            <HeaderCell>DAILY</HeaderCell>
            <Cell dataKey='daily' className='white-cell'>
              {(rowData) => `${formatCurrency(rowData.daily, 2)}`}
            </Cell>
          </Column>
        )}

        {columns.includes('TOTAL') && (
          <Column width={150} sortable resizable={false}>
            <HeaderCell>TOTAL</HeaderCell>
            <Cell dataKey='total' className='white-cell'>
              {(rowData) => `${formatCurrency(rowData.total, 0)}`}
            </Cell>
          </Column>
        )}
      </Table>
      {showPagination && (
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size='xs'
            layout={['total', '-', 'pager']}
            total={dataSize}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      )}
    </div>
  );
};

export default MetagraphTable;
