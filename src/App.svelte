<script>
	import Bot from "./components/Bot.svelte";
  import Griglia from "./components/Griglia.svelte";
  import Menu from "./components/Menu.svelte";
  import Riepilogo from "./components/Riepilogo.svelte";
  import Storico from "./components/Storico.svelte";
	import scacchiera from './scripts/ForzaStore';
	import forza4 from './scripts/StatisticheStore';
	
	let isGameActive;

	let nome1;
	let colore1 = 'red';
	let nome2;
	let colore2 = 'green';
	let currentView = 'menu';

	function start(colonna, celle) {
		forza4.startNewGame();
		scacchiera.createScacchiera(colonna, celle);
		isGameActive = true;
	}

	function handleViewChange(event) {
		currentView = event.detail.view;

		if(event.detail.players){
			nome1 = event.detail.players[0].nome;
			nome2 = event.detail.players[1].nome;

			colore1 = event.detail.players[0].colore;
			colore2 = event.detail.players[1].colore;
		}

		if (currentView === "game") start(event.detail.colonne, event.detail.celle);
	}
</script>

<main class:menu={currentView === "menu"} class:game={currentView === "game"} class="quicksand">
	{#if currentView !== "summary" && currentView !== "storico"}
		<Bot colore={colore1} nome={nome1} isGameActive={currentView === "game"}/>
	{/if}
	{#if currentView === "menu"}
		<Menu on:startGame={handleViewChange} on:changeView={handleViewChange}/>
	{:else if currentView === "game"}
		<Griglia on:changeView={handleViewChange}/>
	{:else if currentView === "summary"}
		<Riepilogo on:changeView={handleViewChange}/>
	{:else if currentView === "storico"}
		<Storico on:changeView={handleViewChange}/>
	{/if}
	{#if currentView !== "summary" && currentView !== "storico"}
		<Bot colore={colore2} nome={nome2} isGameActive={currentView === "game"}/>
	{/if}
</main>

<style>
	main{
		width: 100%;
		height: 100%;
		background: url('SVG/blob-scatter-haikei.svg') no-repeat center center;
		background-size: cover;
		display: flex;
	}
	
	main.menu{
		align-items: center;
		justify-content: space-evenly;
	}
	
	main.game{
		justify-content: space-between;
	}
</style>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
	
	<title>Forza4</title>
</svelte:head>