
import gameState from "./state.js";
import boosters from "./boosters.js";

let canSummon = true;

const cardsCollection = Object.values(boosters).flatMap(
    booster => booster.cards
);

function createDeck(player) {
    player.deck = [...cardsCollection]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(card => ({ ...card }));
}

function drawCard(player) {
    if (player.hand.length >= 5) return;
    if (player.deck.length === 0) return;

    const card = player.deck.shift();
    player.hand.push(card);

    return card;
}

function summonCard(player, cardId) {
    const index = player.hand.findIndex(card => card.id === cardId);

    if (index === -1) return false;
    if (player.battlefield.length >= 10) return false;

    const card = player.hand.splice(index, 1)[0];
    player.battlefield.push(card);

    return true;
}

function updateHand() {
    const player = gameState.players.player;
    const slots = document.querySelectorAll(".player-card");

    slots.forEach((slot, index) => {
        const card = player.hand[index];

        if (card) {
            slot.innerHTML = `
                <img src="${card.image}"
                     class="w-full h-full object-cover rounded-lg cursor-pointer">
            `;

            slot.onclick = function () {
                if (!canSummon) return;

                const summoned = summonCard(player, card.id);

                if (!summoned) return;

                canSummon = false;

                updateHand();
                updateBattlefield();

                document.dispatchEvent(
                    new Event("player-summoned")
                );

                setTimeout(() => {
                    canSummon = true;
                }, 3000);
            };

        } else {
            slot.innerHTML = "";
            slot.onclick = null;
        }
    });
}

function updateOpponentHand() {
    const opponent = gameState.players.opponent;
    const slots = document.querySelectorAll(".opponent-card");

    slots.forEach((slot, index) => {
        if (opponent.hand[index]) {
            slot.innerHTML = `
                <div class="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-black">
                    <span class="text-xs font-bold text-amber-400">MYTHORIA</span>
                </div>
            `;
        } else {
            slot.innerHTML = "";
        }
    });
}

function updateBattlefield() {
    const player = gameState.players.player;
    const slots = document.querySelectorAll(".player-battle-slot");

    slots.forEach((slot, index) => {
        const card = player.battlefield[index];

        slot.innerHTML = card
            ? `
                <div class="relative w-full h-full">
                    <img src="${card.image}"
                         class="w-full h-full object-cover rounded-lg">

                    <span class="absolute bottom-1 right-1 rounded bg-black px-2 py-1 text-xs text-white">
                        DEF: ${card.currentDefense}
                    </span>
                </div>
            `
            : "";

        slot.onclick = function () {
            if (!card) return;

            player.selectedCard = card;

            slots.forEach(s => {
                s.classList.remove("ring-2", "ring-amber-400");
            });

            slot.classList.add("ring-2", "ring-amber-400");

            console.log("Selected card:", card.name);
        };
    });
}

function updateOpponentBattlefield() {
    const opponent = gameState.players.opponent;
    const slots = document.querySelectorAll(".opponent-battle-slot");

    slots.forEach((slot, index) => {
        const card = opponent.battlefield[index];

        slot.innerHTML = card
            ? `
                <div class="relative w-full h-full">
                    <img src="${card.image}"
                         class="w-full h-full object-cover rounded-lg">

                    <span class="absolute bottom-1 right-1 rounded bg-black px-2 py-1 text-xs text-white">
                        DEF: ${card.currentDefense}
                    </span>
                </div>
            `
            : "";

        slot.onclick = function () {
            if (!card) return;

            const player = gameState.players.player;

            if (!player.selectedCard) return;

            const attacker = player.selectedCard;

            const attacked = attackCard(attacker, card);

            if (!attacked) return;

            player.selectedCard = null;

            updateBattlefield();
        };
    });
}

function attackCard(attacker, defender) {
    const player = gameState.players.player;
    const opponent = gameState.players.opponent;

    const attackerExists = player.battlefield.includes(attacker);
    const defenderExists = opponent.battlefield.includes(defender);

    if (!attackerExists || !defenderExists) return false;

    if (attacker.hasAttacked) return false;

    // Calculate damage
    defender.currentDefense -= attacker.attack;

    // Mark attacker as used
    attacker.hasAttacked = true;

    // Remove defeated defender
    if (defender.currentDefense <= 0) {
        const index = opponent.battlefield.indexOf(defender);
        opponent.battlefield.splice(index, 1);
    }

    updateOpponentBattlefield();

    return true;
}

function initializeCards() {
    createDeck(gameState.players.player);
    createDeck(gameState.players.opponent);

    for (let i = 0; i < 5; i++) {
        drawCard(gameState.players.player);
        drawCard(gameState.players.opponent);
    }

    updateHand();
    updateOpponentHand();
    updateBattlefield();
    updateOpponentBattlefield();
}

export {
    createDeck,
    drawCard,
    summonCard,
    attackCard,
    initializeCards,
    updateHand,
    updateOpponentHand,
    updateBattlefield,
    updateOpponentBattlefield
};