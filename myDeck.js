
const collection =
    JSON.parse(localStorage.getItem("mythoriaCollection")) || [];

let deck =
    JSON.parse(localStorage.getItem("mythoriaDeck")) || [];

const MAX_CARDS = 15;

function saveDeck() {
    localStorage.setItem("mythoriaDeck", JSON.stringify(deck));
}

function addCard(id) {
    if (deck.includes(id)) {
        alert("This card is already in your deck!");
        return;
    }

    if (deck.length >= MAX_CARDS) {
        alert("Your deck is full!");
        return;
    }

    deck.push(id);
    saveDeck();
    displayCards();
}

function removeCard(id) {
    deck = deck.filter(function (cardId) {
        return cardId !== id;
    });

    saveDeck();
    displayCards();
}

function displayCards() {
    const available = document.querySelector("#available-cards");
    const selected = document.querySelector("#deck-cards");

    available.innerHTML = "";
    selected.innerHTML = "";

    collection.forEach(function (card) {
        available.innerHTML += `
            <article class="rounded-lg border border-amber-500/40 bg-black p-3">
                <img src="${card.image}" alt="${card.name}" class="w-full rounded">
                <h3 class="mt-2 font-bold text-amber-400">${card.name}</h3>
                <p class="text-sm text-gray-300">${card.rarity}</p>
                <button
                    onclick="addCard(${card.id})"
                    class="mt-3 rounded bg-amber-500 px-3 py-2 text-black">
                    Add
                </button>
            </article>
        `;

        if (deck.includes(card.id)) {
            selected.innerHTML += `
                <article class="rounded-lg border border-amber-500/40 bg-black p-3">
                    <img src="${card.image}" alt="${card.name}" class="w-full rounded">
                    <h3 class="mt-2 font-bold text-amber-400">${card.name}</h3>
                    <button
                        onclick="removeCard(${card.id})"
                        class="mt-3 rounded bg-red-500 px-3 py-2 text-white">
                        Remove
                    </button>
                </article>
            `;
        }
    });

    document.querySelector("#deck-count").textContent = deck.length;
}

displayCards();
