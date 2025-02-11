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

  .icon{
    width: 100px; height: 100px;
    margin: 10px auto 30px;
    border-radius: 50%;
  }

  .cerchio p{
    font-size: 1.5em;
    text-align: center;
    color: white;
  }

  .input-container{
    padding: 0 10%;
  }

  .input-container input{
    width: 100%;
    border-radius: 10px;
  }
  
  .input-container select{
    width: 100%;
    border-radius: 10px;
    text-align: center;
  }
</style>

<section class="cerchio">
  <div class="icon" style="background-color: {colore};"></div>
  {#if isGameActive}
    <p class="quicksand">{nome}</p>
    <Statistiche giocatore={nome} {colore}/>
  {:else}
    <div class="input-container">
      <input type="text" bind:value={nome}>
      <select bind:value={colore}>
        <option value="red" >Rosso</option>
        <option value="green">Verde</option>
        <option value="blue">Blu</option>
        <option value="yellow">Giallo</option>
        <option value="purple">Viola</option>
      </select>
    </div>
  {/if}
</section>