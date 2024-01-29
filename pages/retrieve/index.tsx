import { useRetrieve } from 'hooks/useRetrieve';
import { Button, Input, Table, Panel } from 'rsuite';
import { calculateSpaceInMB, formatStorage } from 'utils/number';

const RetrievePage = () => {
  const {
    hashValue,
    setHashValue,
    fileInfo,
    handleRetrieve,
    handleGetInfo,
    retrieveLoading,
    getInfoLoading,
  } = useRetrieve();

  return (
    <Panel>
      <p className='mb-4'>{'Please paste your hash value'}</p>
      <Input
        value={hashValue}
        onChange={(value) => setHashValue(value)}
        className='mb-4'
      />

      <div className='flex place-content-end gap-4'>
        <Button
          onClick={handleGetInfo}
          appearance='primary'
          loading={getInfoLoading}
        >
          {'Get Info'}
        </Button>
        <Button
          onClick={handleRetrieve}
          appearance='primary'
          loading={retrieveLoading}
        >
          {'Retrieve'}
        </Button>
      </div>

      {fileInfo && (
        <Panel header='File Information'>
          <div className='flex mb-8'>
            <span className='shardInfo'>
              {`File name: `}
              <span className='shardInfoValue'>{fileInfo.filename}</span>
            </span>
            <span className='shardInfo ml-8'>
              {`Hash: `}
              <span className='shardInfoValue'>{hashValue}</span>
            </span>
            <span className='shardInfo ml-8'>
              {`Size: `}
              <span className='shardInfoValue'>
                {formatStorage(calculateSpaceInMB(fileInfo.nChunks))}
              </span>
            </span>
          </div>
          <Table
            data={fileInfo.chunkTableData}
            height={300}
            virtualized
            autoHeight
          >
            <Table.Column
              flexGrow={1}
              verticalAlign='middle'
              rowSpan={(rowData) => {
                return rowData.chunkIdRowSpan;
              }}
            >
              <Table.HeaderCell>{'Chunk'}</Table.HeaderCell>
              <Table.Cell dataKey='chunkId' className='white-cell' />
            </Table.Column>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>{'Distribution'}</Table.HeaderCell>
              <Table.Cell dataKey='hotkey' className='white-cell'>
                {(rowData) => `${rowData.hotkey} - Key: ${rowData.key}`}
              </Table.Cell>
            </Table.Column>
          </Table>
        </Panel>
      )}
    </Panel>
  );
};

export default RetrievePage;
