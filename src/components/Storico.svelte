<script>
  import { createEventDispatcher } from 'svelte';
  import matches from '../scripts/StatisticheStore';

  let dispatch = createEventDispatcher();

  const games = matches.getGames();
</script>

<section>
  {#each games as game}
    <article class="game">
      <div class="stats">
        <div>
          <h2>ID Game : {game.idGame}</h2>
          <h2>Round : {game.round}</h2>
        </div>
        <div>
          {#if game.winner === 'Pareggio'}
            <h2>Pareggio</h2>
          {:else}
            <h2>Winner: {game.winner.nome} - {game.winner.colore}</h2>
          {/if}
        </div>
      </div>
      <div class="containerP">
        {#each game.players as player}
          <div class="player">
            <h3>{player.nome} - {player.colore}</h3>
            <div class="mosse">
              <p>
                Mosse Offensive: {player.mosseOff}
              </p>
              <p>
                Mosse Diffensive: {player.mosseDif}
              </p>
              <p>
                Mosse Casuali: {player.mosseRand}
              </p>
              <p>
                Mosse Ripetite: {player.mosseRipetute}
              </p>
            </div>
          </div>          
        {/each}
      </div>
    </article>
  {/each}
  <div class="buttons">
    <button on:click={() => dispatch('changeView', {view: 'menu'})}>Home</button>
  </div>
</section>

<style>
  section{
    width: 100%;
    padding: 75px 5%;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  article.game{
    padding: 15px;
    border: 1px solid gray;
    border-radius: 25px;
    color: white;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
  }

  .stats{
    text-align: center;
  }

  .stats div:first-child{
    display: flex;
    justify-content: space-around;
  }

  article div.containerP{
    display: flex;
    row-gap: 5px;
    justify-content: space-between;
  }

  .buttons{
    position: absolute;
    left: 50%; top: 5%;
    transform: translate( -50%, -50%);
  }

  .buttons button{
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

  .buttons button:hover{
    color: black;
    background-color: white;
    transition: .5s;
  }
</style>