class Scacchierra {
  round = 0;

  constructor(colenne, altezzaColonne){
    this.griglia = Array(colenne)
      .fill(new Token)
      .map(() => new Coda(altezzaColonne).fill(null).map(() => new Token('Vuoto', 'Nessuno'))); 
  }

  nextRound() {
    this.round++;
  }

  aggiungiToken(colonna, token){
    const posizioneLibera = this.griglia[colonna].findIndex(
      (t) => t.colore === 'Nessuno'
    );

    if(posizioneLibera === -1){ 
      return false;
    }

    this.griglia[colonna][posizioneLibera] = token;
    return true;
  }
}

class Coda {
  constructor(lunghezza){
    this.lunghezza = lunghezza;
    this.colonna = [];
  }

  getColonna(){
    return [...this.colonna].reverse();
  }
}

class Token {
  constructor(giocatore, colore) {
    this.giocatore = giocatore;
    this.colore = colore;
  }
}