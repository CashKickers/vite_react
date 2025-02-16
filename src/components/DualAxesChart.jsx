import { DualAxes } from '@ant-design/plots';
import { useMemo } from 'react';

const createConfig = (uvBillData, transformData) => ({
  xField: 'time',
  yField: ['value', 'count'],
  children: [
    {
      data: uvBillData,
      type: 'interval',
      interaction: { tooltip: false },
      yField: 'value',
      stack: true,
      percent: true,
      colorField: 'type',
      label: {
        text: (d) => `${(d.value)}`,
        textBaseline: 'bottom',
        style: {
          fill: '#133020',
          textAlign: 'center',
          fontSize: 13,
          fontFamily: 'Pretendard',
          fontWeight: 900,
        },
      },
      style: {
        maxWidth: 40,
        radiusTopLeft: 15,
        radiusTopRight: 15,
      },
      axis: { y: false },
    },
    {
      data: transformData,
      type: 'line',
      yField: 'count',
      colorField: '#FFB900',
      style: { lineWidth: 12 },
      scale: {
        count: {
          min: 0,
          max: 100,
        }
      },
      axis: {
        y: {
          min: 0,       // y축 최솟값
          max: 100, // y축 최댓값
          tickCount: 5,  // y축 눈금 개수 (선택 사항)
          position: 'right',
        }
      },
      // axis: { y: false },
    },
    {
      data: transformData,
      type: 'point',
      yField: 'count',
      colorField: 'white',
      shapeField: 'circle',
      sizeField: 4,
      scale: {
        count: {
          min: 0,
          max: 100,
        }
      },
      axis: {
        y: {
          min: 0,
          max: 100,
          tickCount: 5,
          position: 'right',
        }
      },
      axis: { y: false }
    },
  ],
});

const DualAxesChart = ({ uvBillData, transformData }) => {
  const config = useMemo(() => createConfig(uvBillData, transformData), [uvBillData, transformData]);

  return (
    <div style={{ height: '400px' }}>
      <DualAxes {...config} />
    </div>
  );
};

export default DualAxesChart;
