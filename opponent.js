import gameState from "./state.js";

import {
    drawCard,
    updateOpponentHand,
    updateOpponentBattlefield
} from "./cards.js";

function opponentTurn() {
    const opponent = gameState.players.opponent;

    if (gameState.gameOver) return;

    drawCard(opponent);
    updateOpponentHand();

    if (
        opponent.hand.length > 0 &&
        opponent.battlefield.length < 10
    ) {
        const card = opponent.hand.shift();

        opponent.battlefield.push(card);

        updateOpponentHand();
        updateOpponentBattlefield();
    }
}

export { opponentTurn };