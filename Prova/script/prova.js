import { Scacchierra, Token } from './Scacchiera.js';

const scacchiera = new Scacchierra(5, 5);

const token1 = new Token('bot1', 'red');
const token2 = new Token('bot2', 'blue');

scacchiera.aggiungiToken(Math.floor(Math.random() + 5), token1);
scacchiera.aggiungiToken(Math.floor(Math.random() + 5), token2);

console.log("Stato della scacchiera:");
scacchiera.griglia.forEach((colonna, indice) => {
  console.log(`Colonna ${indice + 1}:`, colonna);
});

console.log("La colonna 0 è piena?", scacchiera.colonnaPiena(0));