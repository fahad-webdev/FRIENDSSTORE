import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function CustomLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: 'Time' }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          color: '#cfb482', // custom line color (blue)
          curve: 'monotone', // smooth curves instead of sharp angles
          area:true,

        },
      ]}
      slotProps={{
        line: {
          style: {
            filter: 'drop-shadow(0px 3px 4px rgb(171, 126, 44)',
            strokeWidth: 2,
          },
        },
        area: {
          style: {
            fill: 'rgba(171, 127, 44, 0.15)',
          },
        },
      }}
      height={300}
      margin={{ top:70, bottom: 0, left: 0, right: 30 }}
      grid={{ horizontal: true }}
    />
  );
}
