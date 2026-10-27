
const boosters = {
    standard: {
        name: "Hunter's Journey",
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
        cards: [
            { id: 16, name: "Great 1", image: "images/great1.png", rarity: "rare" },
            { id: 17, name: "Great 2", image: "images/great2.png", rarity: "rare" },
            { id: 18, name: "Great 3", image: "images/great3.png", rarity: "epic" },
            { id: 19, name: "Great 4", image: "images/great4.png", rarity: "rare" },
            { id: 20, name: "Great 5", image: "images/great5.png", rarity: "legendary" }
        ]
    }
};

let inventory = JSON.parse(localStorage.getItem("mythoriaInventory")) || [];
let collection = JSON.parse(localStorage.getItem("mythoriaCollection")) || [];

let selectedBooster = "";

const boostersContainer = document.querySelector("#boosters-container");
const openButton = document.querySelector("#open-booster");
const revealedCards = document.querySelector("#revealed-cards");

function displayBoosters() {
    boostersContainer.innerHTML = "";

    inventory.forEach(function (item) {
        if (item.quantity > 0) {
            const card = document.createElement("div");
            card.className = "rounded-lg border border-amber-500 p-4 bg-black/70";

            const name = document.createElement("h3");
            name.textContent = item.name;
            name.className = "text-amber-400 font-bold mb-2";

            const quantity = document.createElement("p");
            quantity.textContent = "Quantity: " + item.quantity;
            quantity.style.color = "orange";

            const button = document.createElement("button");
            button.textContent = "Select";
            button.className = "mt-3 rounded bg-amber-500 px-4 py-2 text-black";

            button.addEventListener("click", function () {
                selectedBooster = item.key;
                revealedCards.innerHTML = "";
                openButton.textContent = "Open " + item.name;
            });

            card.appendChild(name);
            card.appendChild(quantity);
            card.appendChild(button);
            boostersContainer.appendChild(card);
        }
    });

    if (boostersContainer.innerHTML === "") {
        boostersContainer.textContent = "You don't own any boosters yet. Visit the shop!";
        boostersContainer.style.color = "white";
    }
}

openButton.addEventListener("click", function () {
    if (selectedBooster === "") {
        alert("Select a booster first!");
        return;
    }

    const ownedBooster = inventory.find(function (item) {
        return item.key === selectedBooster;
    });

    if (!ownedBooster || ownedBooster.quantity < 1) {
        alert("You don't have this booster anymore!");
        return;
    }

    const cards = boosters[selectedBooster].cards;
    const availableCards = [...cards];
    const obtainedCards = [];

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const card = availableCards.splice(randomIndex, 1)[0];

        obtainedCards.push(card);
    }

    revealedCards.innerHTML = "";

    obtainedCards.forEach(function (card) {
        const element = document.createElement("div");
        element.className = "rounded-lg border border-amber-500 bg-black/80 p-3 text-center";

        const image = document.createElement("img");
        image.src = card.image;
        image.alt = card.name;
        image.className = "w-full rounded";

        const name = document.createElement("h3");
        name.textContent = card.name;
        name.className = "mt-2 font-bold text-amber-400";

        const rarity = document.createElement("p");
        rarity.textContent = card.rarity;

        element.appendChild(image);
        element.appendChild(name);
        element.appendChild(rarity);
        revealedCards.appendChild(element);

        collection.push(card);
    });

    localStorage.setItem("mythoriaCollection", JSON.stringify(collection));

    ownedBooster.quantity--;

    if (ownedBooster.quantity === 0) {
        inventory = inventory.filter(function (item) {
            return item.key !== selectedBooster;
        });

        selectedBooster = "";
        openButton.textContent = "Ouvrir le booster";
    }

    localStorage.setItem("mythoriaInventory", JSON.stringify(inventory));

    displayBoosters();
});

displayBoosters();
