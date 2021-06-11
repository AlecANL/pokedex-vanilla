const $app = document.querySelector('.pokedexContent');
const $card = document.querySelector('.pokedexContent-screen');
const $pokeForm = document.getElementById('form-pokemon');
const $inputPokemon = document.getElementById('search-pokemon');
const $loader = document.getElementById('loader');
const $pokemon = document.getElementById('pokemon');
const $radarChart = document.getElementById('radar-chart').getContext('2d');
const $chartContent = document.getElementById('chart-content');

const API = 'https://pokeapi.co/api/v2/pokemon';
var data = {
  labels: ['LABEL1', 'LABEL5', 'dsdasd', 'dasd', 'dasdas'],
  datasets: [
    {
      label: 'DATA1',
      backgroundColor: 'rgba(62,135,74,.5)',
      pointBackgroundColor: '#34b44a',
      data: [0, 3, 4, 2, 3],
    },
  ],
};

// const myChart = new Chart($radarChart, {
//   type: 'radar',
//   data,
//   options: {
//     scales: {
//       r: {
//         grid: {
//           color: '#fff',
//         },
//         angleLines: {
//           color: '#fff',
//         },
//         pointLabels: {
//           color: '#fff',
//         },
//         ticks: {
//           color: '#fff',
//           backdropColor: '#000',
//         },
//       },
//     },
//   },
// });
// console.log(myChart);

function handleErrorFetchPokemon(response, message = '') {
  if (!response) {
    throw new Error(`${response}: ${message}`);
  }
  return response;
}

function buildPokemon({ image, name, id }) {
  const el = document.createElement('img');

  el.setAttribute('data-id', id);
  (el.src = image), (el.alt = name);
  return el;
}

function baseConfigchart(stats) {
  const getData = stats.reduce((dataList, currentValue) => {
    dataList.push(currentValue.base_stat);
    return dataList;
  }, []);

  const getLabels = stats.reduce((labelList, current) => {
    labelList.push(current.stat.name);
    return labelList;
  }, []);
  return {
    getData,
    getLabels,
  };
}

function renderChart($container, type, config, options, labels) {
  // $chartContent.innerHTML = '';
  return new Chart($container, {
    type,
    data: {
      labels,
      datasets: [config],
    },
    options,
  });
}

function buildPokemonChart(pokemon) {
  const something = {
    stat: pokemon.stats.map(stat => stat.base_stat),
  };
  console.log(something);
  const { name } = pokemon;
  const { getLabels } = baseConfigchart(pokemon.stats);
  const color = getPokemonColor(pokemon.type[0]);

  const options = {
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

  // const chartConfig = {
  //       data: pokemon.stats.map(stat => stat.base_stat),
  //       label: name,
  //       backgroundColor: color,
  //       pointBackgroundColor: '#34b44a',
  //     },

  const chartConfig = {
    data: pokemon.stats.map(stat => stat.base_stat),
    label: name,
    backgroundColor: color,
    pointBackgroundColor: '#34b44a',
  };

  const myChart = renderChart(
    $radarChart,
    'radar',
    chartConfig,
    options,
    getLabels
  );
  // myChart.update();
  // myChart.destroy();
  console.log(myChart);
}

function getPokemonColor({ type: { name } }) {
  const colors = {
    fire: '#fddfdf',
    grass: '#defde0',
    electric: '#fcf7de',
    water: '#def3fd',
    ground: '#fceaff',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5',
  };
  return colors[name];
}

function render(pokemon, component, $container) {
  $loader.style.display = 'none';
  $container.innerHTML = '';
  const pokemonFetch = component(pokemon);
  $container.append(pokemonFetch);
  buildPokemonChart(pokemon);
}

async function fetchPokemon(query) {
  return fetch(`${API}/${query}`)
    .then(response => response.json())
    .then(handleErrorFetchPokemon)
    .then(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      stats: pokemon.stats,
      image: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
      type: pokemon.types,
    }))
    .catch(err => console.error(`whoops was happen a wrong ${err}`));
}

function searchById(id) {
  fetchPokemon(id)
    .then(handleErrorFetchPokemon)
    .then(pokemon => render(pokemon, buildPokemon, $pokemon))
    .catch(
      err =>
        new Error(`whoops pokemon with id ${id} does exists try again. ${err}`)
    );
}

function searchByName(name) {
  fetchPokemon(name)
    .then(handleErrorFetchPokemon)
    .then(pokemon => console.log(pokemon))
    .catch(err =>
      console.error(`whoops this pokemon does existss try again :(. ${err}`)
    );
}

function searchQuery(query) {
  if (isNaN(query)) {
    searchByName(query);
    return;
  }
  searchById(query);
}

function handleSubmitForm(e) {
  e.preventDefault();
  const query = $inputPokemon.value;
  if (!query) {
    return;
  }
  $inputPokemon.value = '';
  searchQuery(query);
}

$pokeForm.addEventListener('submit', handleSubmitForm);
$app.addEventListener('click', function () {
  $card.classList.add('is-active');
});
// const data = {
//   labels: ['LABEL1', 'LABEL5', 'dsdasd', 'dasd', 'dasdas'],
//   datasets: [
//     {
//       label: 'DATA1',
//       backgroundColor: 'rgba(62,135,74,.5)',
//       pointBackgroundColor: '#34b44a',
//       data: [0, 3, 4, 2, 3],
//     },
//   ],
// };
