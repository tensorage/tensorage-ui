import React from 'react';

export interface StatiticsProps {
  value: number | string;
  label: string;
  unit?: 'MB' | 'GB' | 'TB' | undefined;
}

const SectionItem = (props: StatiticsProps) => {
  const { value, label, unit } = props;

  return (
    <div className='stat-item'>
      <p className='stat-value'>{`${value} ${unit || ''}`}</p>
      <p className='stat-label'>{label}</p>
    </div>
  );
};

export default SectionItem;
