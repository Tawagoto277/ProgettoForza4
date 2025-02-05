import scacchiera from './ForzaStore';
import stats from './StatisticheStore';

export async function startGame(giocatore1, giocatore2) {
  const numeriCasuali = await ottieniArrayCasuale();
  console.log(numeriCasuali);
  
  let winner = null;
  let giocoFinito = false;
  let conteggioMosse = 1;
  const mosseMassime = scacchiera.dimensioni();
  
  while (conteggioMosse <= mosseMassime && !giocoFinito) {
    let turno = conteggioMosse % 2 === 0;
    let mossa;

    if (turno) {
      //Effettua/Controllo mosse inteligenti / casuali
      mossa = mossaIntelligente(scacchiera.getScacchiera(), giocatore2, giocatore1) || await mossaCasuale(giocatore2, numeriCasuali);
    } else {
      mossa = mossaIntelligente(scacchiera.getScacchiera(), giocatore1, giocatore2) || await mossaCasuale(giocatore1, numeriCasuali);
    };
    
    if (mossa === true) {      
      giocoFinito = controllaGriglia(trovaTokenGiocatore(scacchiera.getScacchiera(), turno ? giocatore2 : giocatore1));
      conteggioMosse++;

      if(giocoFinito){
        winner = turno ? giocatore2 : giocatore1;
      }
      
      if(winner){
        stats.setWinner(winner.giocatore, winner.colore);
      }
      
      await delay(125);
    };
  };
  // console.log('Fine del gioco!');
  return true;
}

//Recupera tutti i token di un giocatore
function trovaTokenGiocatore(griglia, giocatore) {
  const coloreGiocatore = giocatore.colore;
  const tokenGiocate = [];
  
  for (let i = 0; i < griglia.length; i++) {
    for (let j = 0; j < griglia[i].length; j++) {
      if (griglia[i][j].colore === coloreGiocatore) {
        tokenGiocate.push({ colore: coloreGiocatore, colonna: i, posizione: j });
      }
    }
  }
  
  // console.log("Token giocati:", tokenGiocate);
  return tokenGiocate;
}

//Controllo vittoria
function controllaGriglia(tokenGiocate) {
  for (const token of tokenGiocate) {
    const sequenza = trovaSequenzaVittoria(tokenGiocate, token);
    if (sequenza) {
      // console.log("Vittoria trovata!", sequenza);
      return true;
    }
  }
  return false;
}

//Controlla vittoria
function trovaSequenzaVittoria(arrayToken, token) {
  const direzioni = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 }
  ];

  for (const { x, y } of direzioni) {
    const token1 = arrayToken.find(t => t.colonna === token.colonna + x && t.posizione === token.posizione + y);
    if (!token1) continue;

    const token2 = arrayToken.find(t => t.colonna === token.colonna + 2 * x && t.posizione === token.posizione + 2 * y);
    if (!token2) continue;

    const token3 = arrayToken.find(t => t.colonna === token.colonna + 3 * x && t.posizione === token.posizione + 3 * y);
    if (!token3) continue;

    return { token, token1, token2, token3 };
  }

  return null;
}

//Valuta mosse inteligenti atk o def
function mossaIntelligente(griglia, giocatore, avversario) {
  const arrayToken = trovaTokenGiocatore(griglia, giocatore);
  const arraySequenze = creaSequenzePerToken(griglia, arrayToken);
  // console.log(arraySequenze);
  
  const arrayTokenAvversario = trovaTokenGiocatore(griglia, avversario);
  const sequenzeAvversario = creaSequenzePerToken(griglia, arrayTokenAvversario);
  // console.log(sequenzeAvversario);

  const mossaDifensiva = scegliMossaDifensiva(sequenzeAvversario);
  if (mossaDifensiva !== null) {
    let mossa = scacchiera.addToken(mossaDifensiva, giocatore);
    updateStats(giocatore.giocatore, giocatore.colore, 'mosseDif', mossa);
    return mossa;
  };

  if(arraySequenze.length > 0){
    const mossaOffensiva = scegliMossaOffensiva(arraySequenze);
    let mossa = scacchiera.addToken(mossaOffensiva, giocatore);
    updateStats(giocatore.giocatore, giocatore.colore, 'mosseOff', mossa);
    return mossa;
  };

  return null; //Fai mossa random

  //Mossa per bloccare la strike avversaria
  function scegliMossaDifensiva(sequenzeAvversario) {
    let mossaDifensiva = null;

    sequenzeAvversario.forEach(({ token, sequenze }) => {
      sequenze.forEach(({ direzione, posizioni }) => {
        const vuoti = posizioni.filter(p => p.colore === 'Vuoto').length;

        if (vuoti == 1) {
          const indiceVuoto = posizioni.findIndex(p => p.colore === 'Vuoto');
          // console.log("Indice dell'ultimo vuoto:", indiceVuoto);
          
          if (indiceVuoto !== -1) {          
            mossaDifensiva = token.colonna + (direzione.x * (indiceVuoto + 1));
          };
        };
      });
    });
    return mossaDifensiva;
  };

  //Mossa per provare a finire la strike
  function scegliMossaOffensiva(arraySequenze) {
    let migliorMossa = null;
    let minVuoti = Infinity;
  
    arraySequenze.forEach(({ token, sequenze }) => {
      sequenze.forEach(({ direzione, posizioni }) => {
        const vuoti = posizioni.filter(p => p.colore === 'Vuoto').length;

        if (vuoti < minVuoti) {
          minVuoti = vuoti;
          const indicePrimoVuoto = posizioni.findIndex(p => p.colore === 'Vuoto');
          // console.log("Indice del primo vuoto:", indicePrimoVuoto);
          
          if (indicePrimoVuoto !== -1) {
            migliorMossa = token.colonna + (direzione.x * (indicePrimoVuoto + 1));
          };
        };
      });
    });

    return migliorMossa;
  }
}

// Identifica una possibile seguenza per poter creare uno strike
function creaSequenzePerToken(griglia, arrayToken){
  const direzioni = [
    { x: 1, y: 0 },  // destra
    { x: -1, y: 0 }, // sinistra
    { x: 0, y: 1 },  // su
    { x: 1, y: -1 }, // destra giu
    { x: -1, y: -1 },// sinistra giu
    { x: 1, y: 1 },  // destra su
    { x: -1, y: 1 }, // sinistra su
  ];// Direzioni in base al token preso come token in posizione 0, l'inizio della strike

  // Per ogni token trova delle sequenze per ogni direzione
  const arraySequenze = arrayToken.map( token => {
    const sequenze = direzioni.map(({x, y}) => {

      const posizioni = []; 

      for (let i = 1; i <= 3; i++) {
        const nuovaCol = token.colonna + i * x;
        const nuovaPos = token.posizione + i * y;

        if (posizioneValida(nuovaCol, nuovaPos, griglia)) {
          const tokenPos = griglia[nuovaCol][nuovaPos];

          if (tokenPos && (tokenPos.colore === token.colore || tokenPos.colore === 'Vuoto')) {
            posizioni.push(tokenPos);
          } else {
            return null;
          }
        }
      }

      return posizioni.length === 3 ? { direzione: { x, y }, posizioni } : null;
    });

    const sequenzeValide = sequenze.filter(sequenza => sequenza !== null);
    return {
      token,
      sequenze: sequenzeValide
    };
  });

  const arraySequenzeMappato = arraySequenze.filter( s => s.sequenze.length > 0);
  // console.log(arraySequenzeMappato);
  return arraySequenzeMappato;

  //Controlla se la posizione e' fuori dalla griglia di gioco  
  function posizioneValida(col, pos, griglia) {
    return col >= 0 && col < griglia.length && pos >= 0 && pos < griglia[0].length;
  }
}

// Mossa random piu caricamento mossa
async function mossaCasuale(giocatore, numeri) {
  // console.log(`Mossa Random`);
  //Questo random ha senso solo se la griglia e' piu rande di 10x10 perche il limite di questo api e' 100 numeri supponendo che facciano solo mosse rando l'array risulterebbe troppo piccolo per tutte le mosse
  const i = Math.floor(Math.random() * numeri.length);
  let mossa = scacchiera.addToken(numeri[i], giocatore);
  updateStats(giocatore.giocatore, giocatore.colore, 'mosseRand', mossa);
  return mossa;
}

//Aggiorna le statistiche per ogni mossa 
function updateStats(nomePlayer, colorePLayer, mossa, esecuzione){
  if (esecuzione) {
    stats.updateStatsPlayer(nomePlayer, colorePLayer, mossa);
  }else{
    stats.updateStatsPlayer(nomePlayer, colorePLayer, 'mosseRipetute');
  }
}

// Chimata per per le mosse casuali
// https://cors-anywhere.herokuapp.com/corsdemo
async function ottieniArrayCasuale() {
  const massimoColonne = scacchiera.getScacchiera().length;

  try {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://www.randomnumberapi.com/api/v1.0/random?min=0&max=${massimoColonne}&count=${Math.min(scacchiera.dimensioni(), 100)}`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:8080',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    if (!res.ok) {
      throw new Error(`Errore nella richiesta API: ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Errore durante la generazione della mossa:', error);
    return false;
  }
}

//Pausa tra un utno e l'altro
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}