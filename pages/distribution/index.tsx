import { Panel } from 'rsuite';
import CustomMap from 'components/CustomMap';
import { useMetagraph } from 'hooks/useMetagraph';
import { useDistribution } from 'hooks/useDistribution';

const DistributionPage = () => {
  const { loading: metagraphLoading, data } = useMetagraph();
  const { loading: mapLoading, markers } = useDistribution(data);

  return (
    <Panel style={{ width: '100%', height: '500px', position: 'relative' }}>
      <CustomMap markers={markers} loading={metagraphLoading || mapLoading} />
    </Panel>
  );
};

export default DistributionPage;
