const gameState = {
     currentTurn : 1,
     gameOver : false,
     winner: null,
     players: {
        player: {
            name: "Akira",
            hp: 3000,
            faction: "Light",
            deck: [],
            hand:[],
            battlefield: []
        },
        opponent: {
            name: "Dark shadow",
            hp: 3000,
            faction: "Dark",
            deck: [],
            hand: [],
            battlefield: []
        },
     }

};



export default gameState;