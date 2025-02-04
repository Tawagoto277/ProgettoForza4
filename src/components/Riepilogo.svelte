<script>
  import { createEventDispatcher } from 'svelte';
  import stats from '../scripts/StatisticheStore';
  import scacchiera from '../scripts/ForzaStore';

  const game = stats.getGame();
  const dispatch = createEventDispatcher();

  function startGame(){
    const griglia = scacchiera.getScacchiera();
    const colonne = griglia.length;
    const celle = griglia[0].length;    

    dispatch('changeView', { 
      colonne : colonne, 
      celle : celle,
      view: 'game',
      players : game.players
    });
  }
</script>

<main class="back">
  <section>
    <div>
      {#if game.winner === 'Pareggio'}
        <h1>Pareggio</h1>
      {:else}
        <h1>Winner: {game.winner.nome} - {game.winner.colore}</h1>
      {/if}
    </div>
    <div class="round">
      <h3>ID Gioco: {game.idGame}</h3>
      <h3>Round: {game.round}</h3>
    </div>
  </section>
  <section>
    <h2>Giocatori</h2>
    <div class="conPlayer">
      {#each game.players as player}
        <div class="player" style="border-color: {player.colore};">
          <h3>{player.nome} ({player.colore})</h3>
          <p>ID: {player.id}</p>
          <p>Mosse Difensive: {player.mosseDif}</p>
          <p>Mosse Offensive: {player.mosseOff}</p>
          <p>Mosse Casuali: {player.mosseRand}</p>
          <p>Mosse Ripetute: {player.mosseRipetute}</p>
        </div>
      {/each}
    </div>
  </section>
  <div class="conButton">
    <button on:click={() => dispatch('changeView', {view: 'menu'})}>Home</button>
    <button on:click={startGame}>New Game</button>
  </div>
</main>

<style>
  .back{
    width: 100%;
    padding: 1em;
    margin: 2em;
    border: 1px solid gray;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(30px);
  }

  main section{
    padding: 15px;
    text-align: center;
  }

  h1, h2{
    font-size: 2em;
  }

  .round{
    display: flex;
    justify-content: space-evenly;
  }

  .conPlayer{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .player {
    width: 50%;
    padding: 20px 75px;
    border: 1px solid ;
    border-radius: 15px;
    margin: 10px;
    text-align: left;
  }

  .conButton{
    padding: 15px;
    display: flex;
    justify-content: space-evenly;
  }

  .conButton button{
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

  .conButton button:hover{
    color: black;
    background-color: white;
    transition: .5s;
  }
</style>
