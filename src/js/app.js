import {
  searchQuery,
  getNextPokemon,
  getPreviusPokemon,
} from './utils/search.js';

const $app = document.querySelector('.pokedexContent');
const $card = document.querySelector('.pokedexContent-screen');
const $pokeForm = document.getElementById('form-pokemon');
const $inputPokemon = document.getElementById('search-pokemon');
const $chartContainer = document.getElementById('content-chart');
const $nextPokemon = document.getElementById('next');
const $prevPokemon = document.getElementById('prev');
$chartContainer.style.visibility = 'hidden';

function handleSubmitForm(e) {
  e.preventDefault();
  const query = $inputPokemon.value;
  if (!query) {
    $inputPokemon.classList.add('is-shakeAnimation');
    $inputPokemon.addEventListener('animationend', () => {
      $inputPokemon.classList.remove('is-shakeAnimation');
    });
    return;
  }
  $inputPokemon.value = '';
  searchQuery(query);
}

$pokeForm.addEventListener('submit', handleSubmitForm);
$app.addEventListener('click', function () {
  $card.classList.add('is-active');
});

$nextPokemon.addEventListener('click', getNextPokemon);
$prevPokemon.addEventListener('click', getPreviusPokemon);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(register => console.log(`installed succesfully: ${register}`))
    .catch(error => console.warn(`whoops: ${error}`));
} else {
  console.log('Service Workers not supported');
}
