import { Icon } from '@rsuite/icons';
import React from 'react';
import { Panel } from 'rsuite';
import { formatCurrency, formatNumber } from 'utils/number';

export default function DashboardItem({
  value,
  label,
  icon,
  isCurrency = false,
}) {
  return (
    <Panel className='trend-box'>
      <div className='flex justify-between flex-row'>
        <div className='flex items-center text-center'>
          <div className='chart-img'>
            <Icon as={icon} />
          </div>
        </div>
        <div className='text-right'>
          <div className='title'>{label}</div>
          <div className='value'>
            {isCurrency ? formatCurrency(value) : formatNumber(value, 0)}
          </div>
        </div>
      </div>
    </Panel>
  );
}
