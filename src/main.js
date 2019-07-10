import './styles.css';
import 'bootstrap';
import $ from "jquery";
import "./pokemon-api-caller.js";
import "./flavortext.js";
import "./display.js";
import "./pokemon-cries.js";
import { Pokemon, PokemonListByType } from "./pokemon-api-caller.js";
import './randompokemon.js'
import './teampokemon.js'
import "./weight-height-calc.js";
import { bootUp,blinkingButtons,imgAnimation } from './animations.js';
import "./nextpokemon.js";
import "./language.js";
export let userLang = "en";
// this controls the random pokemon of the day
let today = new Date();
let pokemonIndex = parseInt((today.getTime()/8.64e+7)%151);
let pokemonOfTheDay = new Pokemon();

let pokemonSearch = new Pokemon();



$(document).ready(function() {

  // boot up animation
  setTimeout(function(){
    bootUp();
  }, 3000);

  // this delays the load of the initial pokemon
  setTimeout(function(){
    pokemonOfTheDay.flavorTextLookup(pokemonIndex);
  }, 5000)

  $('#name-form').submit(function(event){
    event.preventDefault()
    console.log('form submitted');


    let name = $('#name').val().toLowerCase();
    //-----------changes language from inside the submit-----------
    userLang = $('#language').val();
    // pokemonSearch.userLangChange(inputLanguage);
    // pokemonSearch.flavorTextLookup(name);
    //----------------------
    pokemonSearch.flavorTextLookup(name);
    console.log(pokemonSearch)
    $('.display-screen').click(function(){
      displayImg(pokemonSearch)
      console.log('trying to display')
    });

  });
  $('.sprite-container').on('click', function(){
    console.log('clicked');
    console.log(pokemonSearch);
    pokemonSearch.imgAnimation();
  });

    // this controls the type selection and list display
  $(".type-1").change(function(){
    $(".type-2").val("");
    let selectedType = $('.type-1 option:selected').val();
    let myPokemonList = new PokemonListByType();
    console.log("Type selection change");
    myPokemonList.pokemonTypeCall(`${selectedType}`);

  });

    // this controls the other type selector
  $(".type-2").change(function(){
    $(".type-1").val("");
    let selectedType = $('.type-2 option:selected').val();
    let myPokemonList = new PokemonListByType();
    console.log("Type selection change");
    myPokemonList.pokemonTypeCall(`${selectedType}`);
  });
  
  $(".type-1").click(function(){
    $(".type-2").val("");
    let selectedType = $('.type-1 option:selected').val();
    let myPokemonList = new PokemonListByType();
    myPokemonList.pokemonTypeCall(`${selectedType}`);
  });


});
