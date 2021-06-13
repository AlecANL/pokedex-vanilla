import { getPokemonColor } from './utils.js';
import { buildPokemonChart } from './chartConfig.js';

const $screenInsidePokemon = document.querySelector('.screen-inside');
const $loader = document.getElementById('loader');
const $chartContainer = document.getElementById('content-chart');

export function buildPokemon({ name, image, id, type }) {
  const bgColor = getPokemonColor(type, 1);
  $screenInsidePokemon.style.setProperty('--screenInside', bgColor);
  const pokemon = document.createElement('img');
  pokemon.setAttribute('data-id', id);
  pokemon.setAttribute('width', 140);
  pokemon.setAttribute('height', 140);
  (pokemon.src = image), (pokemon.alt = name);
  return pokemon;
}

export function render(pokemon, component, $container) {
  if (!pokemon) {
    console.warn('whoops pokemon not exits');
    return;
  }
  const elementPokemon = component(pokemon);
  $loader.style.display = 'none';
  $container.innerHTML = '';
  $container.append(elementPokemon);
  $chartContainer.style.visibility = 'visible';
  buildPokemonChart(pokemon);
}
