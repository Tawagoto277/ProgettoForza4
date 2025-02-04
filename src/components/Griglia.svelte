<script>
  import Token from "../scripts/Token";
  import scacchiera from '../scripts/ForzaStore';
  import stats from '../scripts/StatisticheStore';
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { startGame } from '../scripts/StartGame';

  let round = null;
  let showStats = false;
  const dispatch = createEventDispatcher();

  const unsubscribe = stats.subscribe(s => {
    round = stats.getGame().round;
  });

  onMount(() => { 
    const game = stats.getGame();

    let token1, token2;
    if (Math.random() > 0.5) {
      token1 = new Token(game.players[0].nome, game.players[0].colore);
      token2 = new Token(game.players[1].nome, game.players[1].colore);  
    } else {
      token1 = new Token(game.players[1].nome, game.players[1].colore);
      token2 = new Token(game.players[0].nome, game.players[0].colore);
    }

    startGame(token1, token2).then((active) => {
      showStats = active;
      // console.log(stats.getGame());
    });   
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<span id="round">Round : {round}</span>
<div class="griglia">
  {#each $scacchiera as colonna}
  <div class="colonna">
    {#each colonna as cella}
    <div class="cella" style="background-color:{cella.colore == 'Vuoto' ? 'white' : cella.colore}">
    </div>
    {/each}
  </div>
  {/each}
</div>
{#if showStats}
<div class="stats">
  <button on:click={() => {dispatch('changeView',{view: 'summary'})}}>Vai al riepilogo</button>
</div>
{/if}

<style>
  span#round{
    padding: 5px 10px;
    border: 1px solid gray;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(30px);
    color: white;
    z-index: 10;
    position: absolute;
    top: 2em;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .griglia{
    width: 100%;
    padding: 1em;
    margin: 2em;
    border: 1px solid gray;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(30px);
    display: flex;
    justify-content: space-between;
    transform: scaleY(-1);
  }

  .colonna {
    width: 100%;
    padding: 15px;
    margin: 0 10px;
    display: grid;
    grid-gap: 15px;
    align-items: center;
  }

  .cella {
    height: 100%;
    border-radius: 50%;
    border: 2px solid white;
    text-align: center;
    align-content: center;
  }

  button{
    width: 150px;
    padding: 10px;
    border: 2px solid rgb(73, 73, 73);
    border-radius: 5px;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(5px);
    cursor: pointer;
  }

  button:hover{
    background-color: white;
    transition: .5s;
  }

  
  div.stats{
    position: absolute;
    bottom: 2em;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>