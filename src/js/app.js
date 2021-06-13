import { searchQuery } from './utils/search.js';

const $app = document.querySelector('.pokedexContent');
const $card = document.querySelector('.pokedexContent-screen');
const $pokeForm = document.getElementById('form-pokemon');
const $inputPokemon = document.getElementById('search-pokemon');
const $chartContainer = document.getElementById('content-chart');
$chartContainer.style.visibility = 'hidden';

// function getNextPokemon() {}
// function getPreviusPokemon(id) {}

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
