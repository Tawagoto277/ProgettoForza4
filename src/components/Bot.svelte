<script>
  import Statistiche from "./Statistiche.svelte";
  import stats from '../scripts/StatisticheStore'

  export let colore;
  export let isGameActive = false;
  export let nome;


  $: if (isGameActive) {
    if(!nome || nome.length === 0) nome = 'Bot';
    stats.setNewPlayer(nome, colore);
  }
</script>

<style>
  section{
    width: 20%;
    padding: 1.5rem;
    border: 1px solid gray;
    border-radius: 25px;
    margin: 1em;
    box-shadow: 0 4px 8px rgb(73, 73, 73);
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(5px);
  }

  .cerchio div{
    width: 100px; height: 100px;
    margin: 10px auto 30px;
    border-radius: 50%;
  }

  .cerchio p{
    font-size: 1.5em;
    text-align: center;
    color: white;
  }

  .cerchio input{
    width: 100%;
    margin: auto;
    border-radius: 15px;
    display: inline-block;
  }
</style>

<section class="cerchio">
  <div style="background-color: {colore};"></div>
  {#if isGameActive}
    <p class="quicksand">{nome}</p>
    <Statistiche giocatore={nome} {colore}/>
  {:else}
    <input type="text" bind:value={nome}>
  {/if}
</section>