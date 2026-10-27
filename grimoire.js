
const collection = JSON.parse(
    localStorage.getItem("mythoriaCollection")
) || [];

const cardsGrid = document.querySelector("#cards-grid");
const filters = document.querySelectorAll(".booster-filter");
const details = document.querySelector("#details");

const cardBooster = {
    1: "standard", 2: "standard", 3: "standard",
    4: "standard", 5: "standard",
    6: "good", 7: "good", 8: "good",
    9: "good", 10: "good",
    11: "legendary", 12: "legendary", 13: "legendary",
    14: "legendary", 15: "legendary",
    16: "phantom", 17: "phantom", 18: "phantom",
    19: "phantom", 20: "phantom"
};

function displayCards(filter = "all") {
    cardsGrid.innerHTML = "";

    const filteredCards = collection.filter(function (card) {
        return filter === "all" || cardBooster[card.id] === filter;
    });

    if (filteredCards.length === 0) {
        cardsGrid.textContent = "No cards collected yet.";
        return;
    }

    filteredCards.forEach(function (card) {
        const button = document.createElement("button");
        button.className =
            "rounded-lg border border-amber-500/40 bg-[#211910] p-2 text-left";

        const image = document.createElement("img");
        image.src = card.image;
        image.alt = card.name;
        image.className = "w-full rounded";

        const name = document.createElement("p");
        name.textContent = card.name;
        name.className = "mt-2 font-bold text-amber-400";

        const rarity = document.createElement("p");
        rarity.textContent = card.rarity;
        rarity.className = "text-sm text-gray-300";

        button.append(image, name, rarity);

        button.addEventListener("click", function () {
            document.querySelector("#detail-image").src = card.image;
            document.querySelector("#detail-name").textContent = card.name;
            document.querySelector("#detail-rarity").textContent = card.rarity;
            document.querySelector("#detail-description").textContent =
                "A card from your Mythoria collection.";
            document.querySelector("#detail-stats").textContent = "";

            details.hidden = false;
            cardsGrid.parentElement.hidden = true;
            document.querySelector(".sidebar")?.classList.add("hidden");
        });

        cardsGrid.appendChild(button);
    });
}

filters.forEach(function (button) {
    button.addEventListener("click", function () {
        displayCards(button.dataset.filterValue);
    });
});

document.querySelector("#close-details").addEventListener("click", function () {
    details.hidden = true;
    cardsGrid.parentElement.hidden = false;
    document.querySelector(".sidebar")?.classList.remove("hidden");
});

displayCards();
