// console.log('Hello World')
const $pokemonCard = document.getElementById('pokemon-container')

async function fetchData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150');
    const json = await response.json();
    const pokemonList = json.results;
    createPokemon(pokemonList);
  }

fetchData()

function createPokemon(pokemons) {
    const htmlTemplate = [];
  
    for (const poke of pokemons) {
      const pokemonId = poke.url.split('/').slice(-2, -1)[0];
      const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
      const pokemonName = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
  
      htmlTemplate.push(`
        <div class="card" style="width: 18rem;">
          <img src="${pokemonSpriteUrl}" class="card-img-top pokemon-sprite" id="poke-sprite" alt="src">
          <div class="card-body">
            <p class="card-text">#${pokemonId.padStart(3, '0')}</p>
            <p class="card-text">${pokemonName}</p>
          </div>
        </div>
      `);
    }
  
    $pokemonCard.innerHTML = htmlTemplate.join('');
  }

const userLocalStorage = []

$pokemonCard.addEventListener('click', function(e){
    if(e.target.dataset.user) {
        userLocalStorage.push({name: e.target.dataset.user})
        localStorage.setItem('users', JSON.stringify(userLocalStorage))
    }
})