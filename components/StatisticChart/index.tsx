import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function StatisticChart({ data, onPointClick, loading }) {
  const options: ApexOptions = {
    labels: data.map((item) => item.label),
    series: data.map((item) => item.value),
    colors: data.map((item) => item.color),
    stroke: {
      colors: ['#000'],
    },
    plotOptions: {
      pie: {
        donut: {
          background: 'rgb(26, 29, 36)',
        },
      },
    },
    legend: {
      labels: {
        colors: '#fff',
      },
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          onPointClick?.(event, chartContext, config);
        },
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const labels = w.globals.labels;
        const values = series;
        const color = w.globals.colors[dataPointIndex];
        const totalChunks = data[seriesIndex].chunk.nTotalChunks;
        const numMiners = data[seriesIndex].chunk.nMiners;
        const numMinersWithChunks = data[seriesIndex].chunk.nMinersWithChunks;

        return (
          '<div class="arrow_box">' +
          '<div class="circle" style="background-color: ' +
          color +
          ';"></div>' +
          '<table>' +
          '<tr><td>Cold key:&nbsp;</td><td>' + labels[seriesIndex] + '</td></tr>' +
          '<tr><td>Value:&nbsp; </td><td>' + values[seriesIndex] + '%</td></tr>' +
          '<tr><td>Total chunks:&nbsp; </td><td>' + totalChunks + '</td></tr>' +
          '<tr><td>No of miners:&nbsp; </td><td>' + numMiners + '</td></tr>' +
          '<tr><td>No of miners with chunks:&nbsp;</td><td>' + numMinersWithChunks + '</td></tr>' +
          '</table>' +
          '</div>'
        );
      },
    },
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type='donut'
      width='100%'
      height='400'
    />
  );
}
