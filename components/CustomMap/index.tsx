import React, { useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Miner } from 'utils/common';
import { GOOGLE_MAP_API_KEY } from 'utils/constants';

export interface CustomMapProps {
  markers: any[];
  loading: boolean;
}

const CustomMap = ({ markers, loading }: CustomMapProps) => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAP_API_KEY });

  const onMapLoad = (map) => {
    setMap(map);
  };

  const renderInfoWindowContent = (miner: Miner) => {
    const infoWindowStyle = {
      color: '#000',
    };

    return (
      <div style={infoWindowStyle}>
        <h2 className='leading-6'>
          <strong>{miner.axonInfo.ip}</strong>
        </h2>
        <table>
          <tbody>
            <tr>
              <td>{`UID`}</td>
              <td>:&nbsp;{miner.uid}</td>
            </tr>
            <tr className='mt-4'>
              <td>{`ColdKey`}</td>
              <td>:&nbsp;{miner.axonInfo.coldkey}</td>
            </tr>
            <tr className='mt-4'>
              <td>{`HotKey`}</td>
              <td>:&nbsp;{miner.axonInfo.hotkey}</td>
            </tr>
            <tr className='mt-4'>
              <td>{`Type`}</td>
              <td>:&nbsp;{miner.type}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const FaSvgIcon = ({ faIcon, ...rest }) => {
    const { width, height, svgPathData } = faIcon;
    return (
      <svg
        {...rest}
        viewBox={`0 0 ${width} ${height}`}
        width='2em'
        height='2em'
        fill='currentColor'
      >
        <path d={svgPathData}></path>
      </svg>
    );
  };

  const renderMarkerIcon = (miner: Miner): string => {
    return miner.type === 'validator'
      ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
  };

  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          {`Loading Map...`}
        </div>
      )}
      <GoogleMap
        center={{ lat: 0, lng: 0 }}
        zoom={1}
        mapContainerStyle={{ height: '500px', width: '100%' }}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
            icon={{
              url: renderMarkerIcon(marker.miner),
            }}
          />
        ))}
        {selectedMarker && map && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            {renderInfoWindowContent(selectedMarker.miner)}
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};

export default CustomMap;
