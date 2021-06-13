import { getPokemonColor } from './utils.js';
const $radarChart = document.getElementById('radar-chart');

const plugins = {
  // this plugin change appereance to title in chart
  legend: {
    labels: {
      color: 'rgb(255, 255, 255)',
      font: {
        size: 16,
      },
    },
  },
};
export const options = {
  plugins,
  scales: {
    r: {
      grid: {
        color: '#fff',
      },
      angleLines: {
        color: '#fff',
      },
      pointLabels: {
        color: '#fff',
      },
      ticks: {
        color: '#fff',
        backdropColor: '#000',
      },
    },
  },
};
const chartData = {
  labels: [],
  datasets: [
    {
      label: '',
      backgroundColor: '',
      data: [],
      pointBackgroundColor: '#fff',
    },
  ],
};

const myChart = new Chart($radarChart, {
  type: 'radar',
  data: chartData,
  options: options,
});

console.log(myChart);

function baseConfigchart(stats) {
  const getData = stats.reduce((dataList, currentValue) => {
    dataList.push(currentValue.base_stat);
    return dataList;
  }, []);

  const getLabels = [
    'Special Attack',
    'HP',
    'Attack',
    'Special Defense',
    'Defense',
    'Speed',
  ];
  return {
    getData,
    getLabels,
  };
}

export function buildPokemonChart(pokemon) {
  console.log(chartData);
  const { name, type } = pokemon;
  const { getData, getLabels } = baseConfigchart(pokemon.stats);
  const color = getPokemonColor(type);

  const chartConfig = {
    ...chartData,
    data: getData,
    label: name,
    backgroundColor: color,
  };

  chartData.datasets[0] = chartConfig;
  chartData.labels = getLabels;
  myChart.update();
}
