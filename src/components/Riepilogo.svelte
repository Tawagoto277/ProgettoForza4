<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
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

<main class="back" in:fade={{ duration: 400 }}>
  <section class="conRound">
    <div class="idGame">
      <h2>ID Partita: {game.idGame}</h2>
    </div>
    <div class="h1">
      {#if game.winner === 'Pareggio'}
        <h1>Pareggio</h1>
      {:else}
        <h1>Winner: {game.winner.nome} - {game.winner.colore}</h1>
      {/if}
    </div>
    <div class="round">
      <h2>Round: {game.round}</h2>
    </div>
  </section>
  <section>
    <div class="conPlayer">
      {#each game.players as player}
      <div class="player" style="border-color: {player.colore};">
          <span class="cerchio" style="background-color: {player.colore};"></span>
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
    width: 75%;
    padding: 2em;
    margin: 2em auto;
    border: 1px solid gray;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(30px);
  }

  main section.conRound{
    padding: 15px;
    text-align: center;
    display: flex;
    justify-content: space-around;
  }

  .round{
    display: flex;
    justify-content: space-evenly;
  }

  .conPlayer{
    width: 100%;
    margin: 10% 0;
    display: flex;
    justify-content: space-around;
  }

  .player {
    width: 50%;
    padding: 20px 40px;
    border: 1.5px solid ;
    border-radius: 20px;
    margin: 10px;
    text-align: left;
    background-color: transparent;
    position: relative;
  }

  span.cerchio{
    width: 75px; height: 75px;
    border-radius: 50%;
    position: absolute;
    top: 0; left: 50%;
    transform: translate(-50%, -50%);
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
