export default class Token {
  x = null;
  y = null;
  outline = null;

  constructor(giocatore = "Nessuno", colore = "Vuoto") {
    this.giocatore = giocatore;
    this.colore = colore;
  }

  setX(x){
    this.x = x;
  }
  
  setY(y){
    this.y = y;
  }

  setOutline(color){
    this.outline = color;
  }
}