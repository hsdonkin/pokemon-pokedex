
export class Pokemon{
  constructor() {
    this.name = "name";
    this.number = "number";
    this.sprite = "sprite";
    this.flavortext = [];
    this.type = [];
    this.height = "height";
    this.weight = "weight";
  }


  pokemonNameCall(pokemonName){
    let pokeNamePromise = new Promise(function(resolve,reject){
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      let request = new XMLHttpRequest();

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        }else {
          console.log("Rejection!!");
          reject(Error(request.statusText));
        }
      }

      request.open("GET", url, true);
      request.send();
    });

    pokeNamePromise.then(response => {
      let pokemonCalled = JSON.parse(response);
      // console.log(pokemonCalled);
      this.name = pokemonCalled.name;
      this.number = pokemonCalled.id;
      this.sprite = pokemonCalled.sprites.front_default;

      // pushing each type to the this.type array;
      this.type = [];
      for (let i = 0; i < pokemonCalled.types.length; i++) {
          this.type.push(pokemonCalled.types[i].type.name);
      }
      this.type.reverse();
      this.height = pokemonCalled.height;
      this.weight = pokemonCalled.weight;


      // this is where the front end functions are called
        this.dPadSelection();
        this.displayImg();
        this.displayStats();
        this.imgAnimation();
      //

    })

  }



  // pokemonFlavorTextCall(pokemonName, language){
  //   let pokeFlavorPromise = new Promise(function(resolve,reject){
  //     const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
  //     let request = new XMLHttpRequest();
  //
  //     request.onload = function(){
  //       if (this.status === 200) {
  //         console.log("Api responded!");
  //         resolve(request.response);
  //       }else {
  //         console.log("Rejection!!");
  //         reject(Error(request.statusText));
  //       }
  //     }
  //
  //     request.open("GET", url, true);
  //     request.send();
  //   });
  //
  //   pokeFlavorPromise.then(response => {
  //     let pokemonCalled = JSON.parse(response);
  //     this.flavortext = pokemonCalled.flavor_text_entries[0].flavor_text;
  //
  //
  //     // for (let i = 0; i < pokemonCalled.flavor_text_entries.length; i++) {
  //     //     if (pokemonCalled.flavor_text_entries[i].language.name === language) {
  //     //       return this.flavortext = pokemonCalled.flavor_text_entries[i].flavor_text;
  //     //
  //     //     }
  //     // }
  //   })
  //
  // }




} // closing the pokemon class

export class PokemonListByType {
  constructor(){
    this.list = [];
  }
    pokemonTypeCall(pokemonType){
      let pokeTypePromise = new Promise(function(resolve,reject){
        const url = `https://pokeapi.co/api/v2/type/${pokemonType}`;
        let request = new XMLHttpRequest();

        request.onload = function(){
          if (this.status === 200) {
            resolve(request.response);
          }else {
            console.log("Rejection!!");
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();
      });

      pokeTypePromise.then(response => {
        let typeResponse = JSON.parse(response);
        for (let i = 0; i < typeResponse.pokemon.length; i++) {
          // only pushing pokemon from the first 151 to the list

          // if (parseInt(typeResponse.pokemon[i].pokemon.url.slice(34, -1)) <= 151) {
            this.list.push(typeResponse.pokemon[i].pokemon.name);
          // }
        }

        // front end stuff for the type lists goes here
        this.displayList();

      })

    }
}

export const myPokemon = new Pokemon();

const myPokemonList = new PokemonListByType();

// console.log(myPokemonList);
