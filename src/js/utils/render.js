import { getPokemonColor } from './utils.js';
import { buildPokemonChart } from './chartConfig.js';
import { getPokemonDescription } from './fetch.js';

const $screenInsidePokemon = document.querySelector('.screen-inside');
const $loader = document.getElementById('loader');
const $chartContainer = document.getElementById('content-chart');
const $pokemonDescription = document.getElementById('description');

export function buildPokemon({ name, image, id, type }, description) {
  const bgColor = getPokemonColor(type, 1);
  const pokemonDescription = description[description.length - 1]['flavor_text'];
  const pokemon = document.createElement('img');
  $screenInsidePokemon.style.setProperty('--screenInside', bgColor);
  $pokemonDescription.textContent = pokemonDescription;
  pokemon.setAttribute('data-id', id);
  pokemon.setAttribute('width', 140);
  pokemon.setAttribute('height', 140);
  (pokemon.src = image), (pokemon.alt = name);
  return pokemon;
}

export async function render(pokemon, component, $container) {
  if (!pokemon) {
    console.warn('whoops pokemon not exits');
    return;
  }
  const description = await getPokemonDescription(pokemon.id, 'en');
  const elementPokemon = component(pokemon, description);
  // console.log(description);
  $loader.style.display = 'none';
  $container.innerHTML = '';
  $container.append(elementPokemon);
  $chartContainer.style.visibility = 'visible';
  buildPokemonChart(pokemon);
}
