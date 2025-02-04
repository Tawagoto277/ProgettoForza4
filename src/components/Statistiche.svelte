<script>
  import { onDestroy } from 'svelte';
  import stats from '../scripts/StatisticheStore';

  export let giocatore;
  export let colore;

  let statistiche = null;
  const unsubscribe = stats.subscribe(s => {
    statistiche = stats.getStatsPlayer(giocatore, colore);
  });

  onDestroy(unsubscribe);
</script>

<div>
  {#if statistiche}
    <p>Mosse offensive: {statistiche.mosseOff}</p>
    <p>Mosse difensive: {statistiche.mosseDif}</p>
    <p>Mosse casuali: {statistiche.mosseRand}</p>
    <p>Mosse ripetute: {statistiche.mosseRipetute}</p>
  {:else}
    <p>Statistiche non disponibili</p>
  {/if}
</div>

<style>
  div{
    text-align: center;
    color: white;
  }
</style>
