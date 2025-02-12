import { get, writable } from "svelte/store";

const forza4 = writable({
  matches: [],
});

const customStats = {
  subscribe: forza4.subscribe,
  startNewGame: () => {
    forza4.update(state => {
      const newMatch = {
        idGame: state.matches.length + 1,
        round: 0,
        players: [],
        winner: 'Pareggio',
      };

      return {
        ...state,
        matches: [...state.matches, newMatch],
      };
    });
  },
  setNewPlayer: (player, color) => {
    forza4.update(state => {
      const idGame = state.matches.length;
      const newPlayer = {
        id : `${player}-${color}-${idGame}`,
        nome: player,
        colore: color,
        mosseOff: 0,
        mosseDif: 0,
        mosseRand: 0,
        mosseRipetute: 0,
      };

      return {
        ...state,
        matches: state.matches.map(match =>
          match.idGame === idGame ? { ...match, players: [...match.players, newPlayer] } : match
        ),
      };
    });
  },
  setWinner : (player, color) => {
    forza4.update(s => {
      return {
        ...s,
        matches: s.matches.map(match => {
          if (match.idGame === s.matches.length){
            const playerWinner = match.players.find(p => p.nome === player && p.colore === color);

            return{
              ...match,
              winner : playerWinner
            }
          }
          return match;
        })
      }
    })
  },
  updateStatsPlayer: (player, color, tipoMossa) => {
    forza4.update(state => {
      return {
        ...state,
        matches: state.matches.map(match => {
          if (match.idGame === state.matches.length) {
            return {
              ...match,
              round: tipoMossa !== 'mosseRipetute' ? match.round + 1 : match.round,
              players: match.players.map(p => p.nome === player && p.colore === color 
                  ? { ...p, [tipoMossa]: (p[tipoMossa] || 0) + 1 }
                  : p
              ),
            };
          }
          return match;
        }),
      };
    });
  },
  getStatsPlayer: (player, color) => {
    const state = get(forza4);
    const lastGame = state.matches[state.matches.length - 1];
    return lastGame?.players.find(p => p.nome === player && p.colore === color);
  }, 
  getGame: () => {
    let stats = null;
    forza4.subscribe(state => {
      const idGame = state.matches.length;
      if (idGame === 0) return;
      stats = state.matches[idGame - 1] || null;
    })();  
    return stats;
  },
  getGames: () => {
    const { matches } = get(forza4); 
    return [...matches];
  }  
};

export default customStats;