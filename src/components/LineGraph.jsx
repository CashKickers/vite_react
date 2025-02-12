import { useEffect } from 'react';
import PropTypes from 'prop-types'
import Plotly from 'plotly.js-dist';

const LineGraph = ( { data } ) => {

    useEffect(() => {
        const xData = data.map(item => item.date);
        const value = data.map(item => item.value);

        const trace = {
            x: xData,
            y: value,
            mode: 'lines+markers+text',
            text: value.map(String), // 점마다 값을 표시),
            textposition: 'top center', // text 위치
            marker: {
                color: 'rgb(255, 255, 255)',
                size: 7.5
            },
            line: {
                color: 'rgb(237, 197, 91)',
                width: 10
            }
        }

        const graph = [trace];

        const layout = {
            xaxis: {
                tickangle: 0,
                showline: true,
                showgrid: false,
            },
            yaxis: {
                range: [1, 5], // y축 범위 고정
                showgrid: false,
                zeroline: true,
                showticklabels: false
            },
            plot_bgcolor: 'rgba(0,0,0,0)', // 배경색을 투명으로 설정
            paper_bgcolor: 'rgba(0,0,0,0)', // 배경색을 투명으로 설정
        };

        Plotly.newPlot('graph', graph, layout);
    }, [data]);

    return (
        <div id="graph">
        </div>
    );
}

LineGraph.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    })).isRequired
};

export default LineGraph;