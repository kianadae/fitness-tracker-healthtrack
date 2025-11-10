import { ResponsiveLine } from '@nivo/line';
import { Box, Typography } from '@mui/material';

const data = [
  {
    id: 'Running',
    color: 'hsl(210, 70%, 50%)',
    data: [
      { x: 'Mon', y: 5 },
      { x: 'Tue', y: 7 },
      { x: 'Wed', y: 4 },
      { x: 'Thu', y: 8 },
      { x: 'Fri', y: 6 },
      { x: 'Sat', y: 10 },
      { x: 'Sun', y: 12 },
    ],
  },
  {
    id: 'Cycling',
    color: 'hsl(290, 70%, 50%)',
    data: [
      { x: 'Mon', y: 2 },
      { x: 'Tue', y: 3 },
      { x: 'Wed', y: 4 },
      { x: 'Thu', y: 3 },
      { x: 'Fri', y: 5 },
      { x: 'Sat', y: 8 },
      { x: 'Sun', y: 5 },
    ],
  },
];

export const ActivityChart = () => {
  return (
    <Box sx={{ height: 300, width: '100%' }}>
      <Typography variant="h6" color="primary" align="left" gutterBottom>
        Weekly Activity Overview
      </Typography>
      <Box sx={{ height: 250, width: '100%' }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Day',
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Distance (km)',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: 60,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default ActivityChart;
