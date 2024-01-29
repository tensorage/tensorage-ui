import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { API_METAGRAPH } from 'utils/constants';
import { transformMiner } from 'utils/transformer';
import { Miner } from 'utils/common';
import NumbersIcon from '@rsuite/icons/Numbers';
import ConversionIcon from '@rsuite/icons/Conversion';
import UserIcon from '@rsuite/icons/UserInfo';
import _filter from 'lodash/filter';
import _sumBy from 'lodash/sumBy';

export function useMetagraph() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Miner[] | []>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_METAGRAPH}`);

        if (response.data) {
          const data: Miner[] = response.data.map((item: any, index) => {
            return {
              ...transformMiner(item),
              pos: index,
            };
          });
          setData(data);
        }

        // Assuming the response.data contains the fetched data
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateActiveHotkey = (data: Miner[]) => {
    return _filter(data, (item: Miner) => item.active == 1).length;
  };

  const calculateStake = (data: Miner[]) => {
    return _sumBy(data, (item: Miner) => item.stake);
  };

  const calculateTotalValue = (data: Miner[]) => {
    return 256;
  };

  const dashboard = useMemo(() => {
    return [
      {
        label: 'Total slots',
        value: calculateTotalValue(data),
        isCurrency: false,
        icon: NumbersIcon,
      },
      {
        label: 'Total stake',
        value: calculateStake(data),
        isCurrency: false,
        icon: ConversionIcon,
      },
      {
        label: 'Total active',
        value: calculateActiveHotkey(data),
        isCurrency: false,
        icon: UserIcon,
      },
    ];
  }, [data]);

  return { loading, data, error, dashboard };
}
