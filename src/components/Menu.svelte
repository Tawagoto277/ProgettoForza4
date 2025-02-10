<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  
  let dispatch = createEventDispatcher();

  let colonne = 5;
  let altezzaColonne = 5;

  function startGame(){
    dispatch('startGame', { 
      colonne, 
      celle: altezzaColonne,
      view: 'game'  
    });
  }
</script>

<style>
  section{
    padding: 1.5rem;
    border: 1px solid gray;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(5px);
  }

  button{
    width: 150px;
    border-radius: 15px;
    cursor: pointer;
  }

  #centro{
    width: 25%;
    text-align: center;
    position: relative;
  }

  #centro h1{
    font-size: 3.5em;
    color: whitesmoke;
  }

  #centro div#dimensioni{
    margin: auto;
    font-size: 1.2em;
    color: whitesmoke;
  }

  #dimensioni{
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(2 ,1fr);
    grid-gap: 15px;
  }

  #dimensioni input{
    width: 75px;
    border-radius: 15px;
    text-align: center;
    color: white;
    background-color: transparent;
  }

  #play{
    position: absolute;
    bottom: -25%;
    transform: translate(-50%, -50%);
  }

  button{
    width: 150px;
    padding: 10px;
    border: 2px solid white;
    border-radius: 5px;
    color: white;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(5px);
    cursor: pointer;
  }

  button:hover{
    color: black;
    background-color: white;
    transition: .5s;
  }
</style>

<section id="centro" in:slide={{ duration: 300 }}>
  <h1 class="quicksand">Forza 4</h1>
  <!-- <button>Statistiche</button> -->
  <div id="dimensioni">
    <label for="colonne">Larghezza griglia</label>
    <input id="colonne" type="number" min="5" max="10" bind:value={colonne}>
    <label for="altezzaColonne">Altezza griglia</label>
    <input id="altezzaColonne" type="number" min="5" max="10" bind:value={altezzaColonne}>
  </div>
  <button id="play" on:click={startGame} >PLAY</button>
</section>