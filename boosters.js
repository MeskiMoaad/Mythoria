
const boosters = {
    standard: {
        name: "Hunter's Journey",
        price: 2,
        cards: [
            { id: 1, name: "Forest Hunter", image: "images/std1.png", rarity: "standard" },
            { id: 2, name: "Wild Archer", image: "images/std2.png", rarity: "standard" },
            { id: 3, name: "Iron Guardian", image: "images/std3.png", rarity: "standard" },
            { id: 4, name: "Mystic Scout", image: "images/std4.png", rarity: "standard" },
            { id: 5, name: "Shadow Dragon", image: "images/legend1.png", rarity: "legendary" }
        ]
    },

    good: {
        name: "Heaven's Path",
        price: 10,
        cards: [
            { id: 6, name: "Heaven's Mage", image: "images/good1.png", rarity: "epic" },
            { id: 7, name: "Celestial Knight", image: "images/good2.png", rarity: "epic" },
            { id: 8, name: "Sacred Guardian", image: "images/good3.png", rarity: "rare" },
            { id: 9, name: "Forest Hunter", image: "images/std1.png", rarity: "standard" },
            { id: 10, name: "Eclipse Lord", image: "images/legend2.png", rarity: "legendary" }
        ]
    },

    legendary: {
        name: "King's Awakening",
        price: 50,
        cards: [
            { id: 11, name: "Dragon King", image: "images/legend1.png", rarity: "legendary" },
            { id: 12, name: "Eclipse Lord", image: "images/legend2.png", rarity: "legendary" },
            { id: 13, name: "Eternal Phoenix", image: "images/legend3.png", rarity: "legendary" },
            { id: 14, name: "Lightbringer", image: "images/good4.png", rarity: "epic" },
            { id: 15, name: "Wolf Companion", image: "images/std5.png", rarity: "standard" }
        ]
    },

    phantom: {
        name: "Phantom Troupe",
        price: 15,
        cards: [
            { id: 16, name: "Phantom Assassin", image: "images/great1.png", rarity: "rare" },
            { id: 17, name: "Shadow Reaper", image: "images/great2.png", rarity: "rare" },
            { id: 18, name: "Night Stalker", image: "images/great3.png", rarity: "epic" },
            { id: 19, name: "Ghost Commander", image: "images/great4.png", rarity: "rare" },
            { id: 20, name: "Void Emperor", image: "images/legend4.png", rarity: "legendary" }
        ]
    }
};

function addStats(card) {
    let attack;
    let defense;

    if (card.rarity === "standard") {
        attack = 200;
        defense = 300;
    } else if (card.rarity === "rare") {
        attack = 400;
        defense = 500;
    } else if (card.rarity === "epic") {
        attack = 600;
        defense = 700;
    } else if (card.rarity === "legendary") {
        attack = 1000;
        defense = 1000;
    }

    return {
        ...card,
        attack,
        defense,
        currentDefense: defense,
        hasAttacked: false
    };
};

Object.values(boosters).forEach(booster => {
    booster.cards = booster.cards.map(addStats);
});


export default boosters;