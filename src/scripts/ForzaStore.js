import { writable } from "svelte/store";
import Token from "./Token";

const scacchiera = writable([]);

const customScacchiera = {
  subscribe: scacchiera.subscribe,
  createScacchiera: (colonne, altezzaColonne) => {
    scacchiera.set(
      Array.from({ length: colonne }, () => 
        Array.from({ length: altezzaColonne }, () => new Token()))
    );
  },
  getScacchiera: () => {
    let scacchieraInversa;
    scacchiera.subscribe(valore => scacchieraInversa = valore)();
    return scacchieraInversa.map(colonna => [...colonna]);
  },
  addToken: (posColonna, token) => {
    let tokenInserito = false;
    scacchiera.update(currentScacchiera => {
      const updateScacchiera = [...currentScacchiera];
      if(updateScacchiera[posColonna]){
        const cellaDisponibile  = updateScacchiera[posColonna].findIndex( t => t.giocatore === 'Nessuno');
        if(cellaDisponibile != -1){
          updateScacchiera[posColonna][cellaDisponibile ] = token;
          tokenInserito = true;
        };
      };
      return updateScacchiera;
    })

    return tokenInserito;
  },
  dimensioni: () => {
    let dimensioniTotali = 0;
    scacchiera.subscribe(valore => {
      if (valore.length > 0) {
        dimensioniTotali = valore.length * valore[0].length;
      };
    })();
    return dimensioniTotali;
  }
};

export default customScacchiera;