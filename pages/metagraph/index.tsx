import React, { useState } from 'react';
import { Input, InputGroup, Stack, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MetagraphTable from 'components/MetagraphTable';
import DashboardItem from 'components/DashboardItem';
import { useMetagraph } from 'hooks/useMetagraph';

const limitOptions = [10, 25, 50, 100];

const StorePage = () => {
  const [searchKeyword, setSearchKeyword] = useState(''); // Currently, default is search by UID
  const [selectedLimit, selSelectedLimit] = useState<number>(0);
  const { loading, data, dashboard } = useMetagraph();

  return (
    <div>
      <Row gutter={30} className='dashboard-header'>
        {dashboard.map((item) => (
          <Col xs={8}>
            <DashboardItem
              label={item.label}
              value={item.value}
              key={item.label}
              isCurrency={item.isCurrency}
              icon={item.icon}
            />
          </Col>
        ))}
      </Row>

      <Row className='mt-8'>
        <Stack className='mb-4' justifyContent='space-between'>
          <div className='flex text-md'>
            <div className='mr-4'>Show</div>
            <div className='flex'>
              {limitOptions.map((value, index) => (
                <div
                  key={`sort-option-${value}`}
                  className='mr-2'
                  style={{
                    opacity: selectedLimit == index ? 1 : 0.6,
                    fontWeight: selectedLimit == index ? 'bold' : 'normal',
                  }}
                  onClick={() => selSelectedLimit(index)}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
          <InputGroup style={{ width: 300 }} inside>
            <Input
              placeholder='Search'
              value={searchKeyword}
              onChange={setSearchKeyword}
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>

        <MetagraphTable
          searchKeyword={searchKeyword}
          limit={limitOptions[selectedLimit]}
          data={data}
          loading={loading}
          columns={[
            'POS',
            'UID',
            'STAKE',
            'RANK',
            'TRUST',
            'VTRUST',
            'CONSENSUS',
            'INCENTIVE',
            'DIVIDENDS',
            'EMISSION',
            'UPDATED',
            'ACTIVE',
            'AXON',
            'COLD_KEY',
            'HOT_KEY',
          ]}
        />
      </Row>
    </div>
  );
};

export default StorePage;
