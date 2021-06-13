import { getPokemon } from './fetch.js';
import { handleFetchError } from './utils.js';
import { buildPokemon, render } from './render.js';

const $inputPokemon = document.getElementById('search-pokemon');
const $pokemon = document.getElementById('pokemon');

let currentPokemon = 1;

const maxPokemon = 898;
const minPokemon = 1;

function searchById(id) {
  const parseId = Math.floor(+id);
  currentPokemon = parseId;
  if (parseId > maxPokemon || parseId < minPokemon) {
    $inputPokemon.classList.add('is-shakeAnimation');
    $inputPokemon.addEventListener('animationend', () => {
      $inputPokemon.classList.remove('is-shakeAnimation');
    });
    console.warn('whoops');
    // Add elemet to comunicate a user error;
    return;
  }
  getPokemon(parseId)
    .then(handleFetchError)
    .then(pokemon => render(pokemon, buildPokemon, $pokemon))
    .catch(
      err =>
        new Error(`whoops pokemon with id ${id} does exists try again. ${err}`)
    );
}

function searchByName(name) {
  const parserName = name.toLowerCase().trim();
  getPokemon(parserName)
    .then(handleFetchError)
    .then(pokemon => render(pokemon, buildPokemon, $pokemon))
    .catch(
      err =>
        new Error(
          `whoops this pokemon: ${name} does existss try again :(. ${err}`
        )
    );
}

function searchPokemonByButtons(currentId = 1) {
  getPokemon(currentId)
    .then(handleFetchError)
    .then(pokemon => render(pokemon, buildPokemon, $pokemon))
    .catch(error => new Error(`whoops try again error: ${error}`));
}

export function searchQuery(query) {
  if (isNaN(query)) {
    searchByName(query);
    return;
  }
  searchById(query);
}

export function getNextPokemon() {
  currentPokemon++;
  if (currentPokemon > 898) {
    currentPokemon = 1;
  }
  searchPokemonByButtons(currentPokemon);
}

export function getPreviusPokemon() {
  if (currentPokemon < 1) {
    currentPokemon = 898;
  }
  currentPokemon--;
  searchPokemonByButtons(currentPokemon);
}
// function getPreviusPokemon(id) {}
