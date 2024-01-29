import SectionItem from 'components/SectionItem';
import { useOverview } from 'hooks/useOverview';

const HeaderStatistics = () => {
  const { stats } = useOverview();

  return (
    <div className='stats-container'>
      {stats.map((item) => (
        <SectionItem
          value={item.value}
          label={item.label}
          key={item.label}
          unit={item.unit}
        />
      ))}
    </div>
  );
};

export default HeaderStatistics;
