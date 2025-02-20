<script>
  import matches from '../scripts/StatisticheStore';
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  
  let dispatch = createEventDispatcher();

  let colonne = 5;
  let altezzaColonne = 5;

  const games = matches.getGames();
  console.log(games);
  
  function startGame(){
    dispatch('startGame', { 
      colonne, 
      celle: altezzaColonne,
      view: 'game'  
    });
  }

  function viewStoricoPartite() {
    dispatch('changeView', { view: 'storico' });
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

  #centro{
    width: 25%;
    text-align: center;
    color: whitesmoke;
    position: relative;
  }

  #centro h1{
    font-size: 3.5em;
  }

  #centro div#dimensioni{
    font-size: 1.2em;
  }

  #dimensioni{
    display: grid;
    grid-template-columns: repeat(2 ,1fr);
    grid-gap: 15px;
  }

  #dimensioni input{
    width: 150px;
    border-radius: 15px;
    text-align: center;
    color: white;
    background-color: transparent;
  }

  .bottoni{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    left: 50% ; bottom: -30%;
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
  <h1 class="quicksand">FORZA 4</h1>
  <div id="dimensioni">
    <label for="colonne">Larghezza griglia</label>
    <input id="colonne" type="number" min="5" max="10" bind:value={colonne}>
    <label for="altezzaColonne">Altezza griglia</label>
    <input id="altezzaColonne" type="number" min="5" max="10" bind:value={altezzaColonne}>
  </div>
  <div class="bottoni">
    <button on:click={startGame} >PLAY</button>
    {#if games.length !== 0}
      <button on:click={viewStoricoPartite}>Storico Partite</button>
    {/if}
  </div>
</section>