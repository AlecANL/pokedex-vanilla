import { handleFetchError } from './utils.js';

export async function fetchPokemon(endPoint = 'pokemon', query) {
  return fetch(`https://pokeapi.co/api/v2/${endPoint}/${query}`)
    .then(handleFetchError)
    .then(response => response.json())
    .then(pokemon => pokemon)
    .catch(error => console.log(error));
}

export async function getPokemon(query) {
  if (!query) return console.warn('please enter a valid data');
  return fetchPokemon('pokemon', query)
    .then(handleFetchError)
    .then(pokemon => ({
      id: pokemon?.id,
      name: pokemon?.name,
      type: pokemon?.types,
      image: pokemon?.sprites.other['official-artwork'].front_default,
      // helper image
      // `https://pokeres.bastionbot.org/images/pokemon/${pokemon?.id}.png`
      stats: pokemon?.stats,
    }))
    .catch(error => console.log(error));
}

export async function getPokemonDescription(id, language) {
  return fetchPokemon('pokemon-species', id)
    .then(handleFetchError)
    .then(description =>
      description['flavor_text_entries'].filter(
        text => text.language.name === language
      )
    )
    .catch(error => console.log(error));
}
