import axios from 'axios';
import { API_OVERVIEW } from 'utils/constants';
import { transformOverviewData } from 'utils/transformer';
import { IOverview } from 'utils/common';
import {
  calculateSpaceInMB,
  formatNumber,
  formatStorageSize,
} from 'utils/number';
import { StatiticsProps } from 'components/SectionItem';
import useSWR, { mutate } from 'swr';

const fetchOverviewData = async (url): Promise<IOverview | null> => {
  const response = await axios.get(url);
  return response.data ? transformOverviewData(response.data) : null;
};

export function useOverview() {
  const {
    data: overviewData,
    error,
    isValidating,
  } = useSWR(API_OVERVIEW, fetchOverviewData);
  const loading = !overviewData && !error;

  const totalSpace = formatStorageSize(
    calculateSpaceInMB(overviewData?.totalSpace || 0)
  );
  const usedSpace = formatStorageSize(
    calculateSpaceInMB(overviewData?.usedSpace || 0)
  );
  const availableSpace = formatStorageSize(
    calculateSpaceInMB(overviewData?.availableSpace || 0)
  );

  const stats: StatiticsProps[] = [
    {
      label: 'Total space',
      value: totalSpace.size,
      unit: totalSpace.unit,
    },
    {
      label: 'Used space',
      value: usedSpace.size,
      unit: usedSpace.unit,
    },
    {
      label: 'Available space',
      value: availableSpace.size,
      unit: availableSpace.unit,
    },
    {
      label: 'Total files',
      value: formatNumber(overviewData?.nFiles || 0, 0),
    },
  ];

  const triggerFetch = async () => {
    // Perform upload action here...

    // Trigger a refetch of data after the upload
    mutate(API_OVERVIEW);
  };

  return {
    loading: isValidating,
    data: overviewData,
    error,
    stats,
    triggerFetch,
  };
}
