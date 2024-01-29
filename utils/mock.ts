import { faker } from '@faker-js/faker/locale/en';
import NumbersIcon from '@rsuite/icons/Numbers';
import ConversionIcon from '@rsuite/icons/Conversion';
import UserIcon from '@rsuite/icons/UserInfo';

export function mockMetagraph(length: number) {
  const createRowData = (rowIndex) => {
    const pos = faker.number.int({ min: 0, max: 1000 });
    const uid = faker.number.int({ min: 0, max: 1000 });
    const stake = faker.number.int({ min: 100000, max: 9999999 });
    const rank = faker.number.int({ min: 0, max: 1000 });
    const updated = faker.number.int({ min: 1, max: 9999 });
    const active = faker.number.int({ min: 0, max: 1 });
    const hotKey = faker.finance.ethereumAddress();
    const coldKey = faker.finance.ethereumAddress();
    const dailyReward = faker.number.float({
      min: 1,
      max: 99,
      precision: 0.01,
    });
    const daily = dailyReward * 300;
    const total = daily * 30;
    const vtrust = faker.number.float({ min: 0, max: 1, precision: 0.00001 });
    const trust = faker.number.float({ min: 0, max: 1, precision: 0.00001 });
    const consensus = faker.number.float({
      min: 0,
      max: 1,
      precision: 0.00001,
    });
    const incentive = faker.number.float({
      min: 0,
      max: 1,
      precision: 0.00001,
    });
    const dividends = faker.number.float({
      min: 0,
      max: 1,
      precision: 0.00001,
    });
    const emission = faker.number.float({ min: 0, max: 1, precision: 0.00001 });

    return {
      id: rowIndex + 1,
      pos,
      uid,
      stake,
      rank,
      updated,
      active,
      hotKey,
      coldKey,
      dailyReward,
      daily,
      total,
      vtrust,
      trust,
      consensus,
      incentive,
      dividends,
      emission,
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export function mockPieChartData() {
  const data = [
    { label: 'Category 1', value: 30, color: 'rgb(20, 222, 194)' },
    { label: 'Category 2', value: 40, color: 'rgb(255, 153, 0)' },
    { label: 'Category 3', value: 20, color: '#f78da7' },
    { label: 'Category 4', value: 10, color: 'rgb(132, 132, 132)' },
  ];

  return data;
}

export function mockStatisticData() {
  const data = [
    {
      label: 'Total available (GB)',
      value: '1000',
    },
    {
      label: 'Total files',
      value: '179',
    },
    {
      label: 'Total users',
      value: '560',
    },
  ];
  return data;
}

export function mockDashboardData() {
  const data = [
    {
      label: 'Total value',
      value: faker.number.int({ min: 100000, max: 9999999 }),
      isCurrency: true,
      icon: NumbersIcon,
    },
    {
      label: 'Total stake',
      value: faker.number.int({ min: 100000, max: 999999 }),
      isCurrency: true,
      icon: ConversionIcon,
    },
    {
      label: 'Total active',
      value: faker.number.int({ min: 100, max: 999 }),
      isCurrency: false,
      icon: UserIcon,
    },
  ];
  return data;
}
