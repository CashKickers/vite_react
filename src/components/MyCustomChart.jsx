import PropTypes from 'prop-types';

import { useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);

const MyCustomChart = ( { date, positive, negative } ) => {
  // const labels = [
  //   '24년\n9월',
  //   '24년\n10월',
  //   '24년\n11월',
  //   '24년\n12월',
  //   '25년\n1월'
  // ];
  const [labels, setLabels] = useState(date);
  const [positiveData, setPositiveData] = useState(positive)
  const [negativeData, setNegativeData] = useState(negative)
  
  const data = {
    labels: date,
    datasets: [
      {
        type: 'bar',
        label: '부정',
        data: negative,
        backgroundColor: 'rgba(237, 197, 91, 0.5)',
        order: 1,
        barPercentage: 0.5,
      },
      {
        type: 'bar',
        label: '긍정',
        data: positive,
        backgroundColor: 'rgba(19, 48, 32, 0.5)',
        barPercentage: 0.5,
        order: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
          bottomLeft: 0,
          bottomRight: 0,
        },
        datalabels: {
          display: false
        }
      },
      {
        type: 'line',
        label: '긍정선',
        data: negative,
        borderColor: '#FFB800',
        borderWidth: 7,
        pointRadius:3,
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        pointBorderWidth: 1,
        fill: false,
        order: 0,
        datalabels: {
          display: false
        }
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 8
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0
        }
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          display: true, // Changed from false to true to display y-axis min and max values
          beginAtZero: true,
          stepSize: 100,
          min: 0,
          max: 100,
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          filter: function(legendItem, chartData) {
            if (legendItem.text === '긍정선') {
              return false; // This will hide the legend item for '긍정'
            }
            return true;
          }
        }
      },
      datalabels: {
        color: '#000000',
        anchor: 'end',
        align: 'top',
        offset: 0,
        font: {
          size: 8,
          color: '#000000'
        },
        formatter: (value, context) => {
          if (context.dataset.type === 'bar') {
            return value;
          }
          return null;
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Chart type='bar' data={data} options={options} />
    </div>
  );
};

MyCustomChart.propTypes = {
  date: PropTypes.array.isRequired,
  positive: PropTypes.array.isRequired,
  negative: PropTypes.array.isRequired,
}

export default MyCustomChart;
