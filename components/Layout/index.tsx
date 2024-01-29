import { useRouter } from 'next/router';
import FileUpload from '@rsuite/icons/FileUpload';
import FileDownload from '@rsuite/icons/FileDownload';
import Table from '@rsuite/icons/Table';
import PieChart from '@rsuite/icons/PieChart';
import Location from '@rsuite/icons/Location';
import Header from './Header';
import Leftmenu from './Leftmenu';
import PageContent from './PageContent';
import { Container, Content } from 'rsuite';

export default function Layout({ children }) {
  const mypageMenuItems = [
    {
      icon: <FileUpload />,
      link: '/store',
      caption: 'Store',
    },
    {
      icon: <FileDownload />,
      link: '/retrieve',
      caption: 'Retrieve',
    },
    {
      icon: <Table />,
      link: '/metagraph',
      caption: 'Metagraph',
    },
    {
      icon: <PieChart />,
      link: '/statistic',
      caption: 'Statistic',
    },
    {
      icon: <Location />,
      link: '/distribution',
      caption: 'Distribution',
    },
  ];

  return (
    <Container className='h-screen'>
      <Header banner={false} />
      <Container style={{ backgroundColor: '#0f131a' }}>
        <Leftmenu items={mypageMenuItems} />
        <Content>
          <PageContent>{children}</PageContent>
        </Content>
      </Container>
    </Container>
  );
}
