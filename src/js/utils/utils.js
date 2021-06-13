const $inputPokemon = document.getElementById('search-pokemon');
const $chartContainer = document.getElementById('content-chart');

export function handleFetchError(response) {
  if (!response) {
    $inputPokemon.classList.add('is-shakeAnimation');
    $chartContainer.style.visibility = 'hidden';
    $inputPokemon.addEventListener('animationend', () => {
      $inputPokemon.classList.remove('is-shakeAnimation');
    });
    throw new Error('whoops was happend a wrong whe try connect api :( ');
  }
  return response;
}

export function getPokemonColor(type, colorPosition = 0) {
  const {
    type: { name },
  } = type[0];

  const colors = {
    fire: ['rgba(253, 223, 223, 0.5)', '#fddfdf'],
    grass: ['rgba(222, 253, 224, .5)', '#defde0'],
    electric: ['rgba(252, 247, 222, .5)', '#fcf7de'],
    water: ['rgba(222, 243, 253, 0.5)', '#def3fd'],
    ground: ['rgba(252, 234, 255, .5)', '#fceaff'],
    rock: ['rgba(213, 213, 212, .5)', '#d5d5d4'],
    fairy: ['rgba(252, 234, 255, .5)', '#fceaff'],
    poison: ['rgba(152, 215, 165, .5)', '#98d7a5'],
    bug: ['rgba(248, 213, 163, .5)', '#f8d5a3'],
    dragon: ['rgba(151, 179, 230, .5)', '#97b3e6'],
    psychic: ['rgba(234, 237, 161, .5)', '#eaeda1'],
    flying: ['rgba(245, 245, 245, .5)', '#f5f5f5'],
    fighting: ['rgba(230, 224, 212, .5)', '#e6e0d4'],
    normal: ['rgba(245, 245, 245, .5)', '#f5f5f5'],
  };
  return colors[name][colorPosition];
}
