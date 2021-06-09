const $app = document.querySelector('.pokedexContent');
const $card = document.querySelector('.pokedexContent-screen');
const $pokeForm = document.getElementById('form-pokemon');
const $inputPokemon = document.getElementById('search-pokemon');
const $loader = document.getElementById('loader');
const $pokemon = document.getElementById('pokemon');
const $radarChart = document.getElementById('radar-chart');

const API = 'https://pokeapi.co/api/v2/pokemon';
var data = {
  labels: ['LABEL1', 'LABEL5', 'dsdasd', 'dasd', 'dasdas'],
  datasets: [
    {
      label: 'DATA1',
      backgroundColor: 'rgba(62,135,74,.5)',
      pointBackgroundColor: '#34b44a',
      data: [3, 3, 4, 2, 3],
    },
  ],
};

const myChart = new Chart($radarChart, {
  type: 'radar',
  data,
  options: {
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
  },
});
console.log(myChart);

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

function render(pokemon, component, $container) {
  $loader.style.display = 'none';
  $container.innerHTML = '';
  const pokemonFetch = component(pokemon);
  $container.append(pokemonFetch);
}

function fetchPokemon(query) {
  return fetch(`${API}/${query}`)
    .then(response => response.json())
    .then(handleErrorFetchPokemon)
    .then(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      stats: pokemon.stats,
      image: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
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
  console.log('hello');
  $card.classList.add('is-active');
});
