
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

let cart = JSON.parse(localStorage.getItem("mythoriaCart")) || [];
let inventory = JSON.parse(localStorage.getItem("mythoriaInventory")) || [];

const buttons = document.querySelectorAll(".add-to-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const key = button.dataset.booster;
        const booster = boosters[key];

        if (!booster) return;

        const quantityInput = button.parentElement.querySelector(".quantity");
        const quantity = Number(quantityInput.value);

        if (quantity < 1 || !Number.isInteger(quantity)) {
            alert("Enter a valid quantity.");
            return;
        }

        const existingItem = cart.find(function (item) {
            return item.key === key;
        });

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                key: key,
                name: booster.name,
                price: booster.price,
                quantity: quantity
            });
        }

        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = "";

    localStorage.setItem("mythoriaCart", JSON.stringify(cart));

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
        cartTotal.textContent = "0";
        return;
    }

    cart.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "flex items-center justify-between gap-4 mb-3";

        const text = document.createElement("span");
        text.textContent =
            `${item.name} x ${item.quantity} — ${item.price * item.quantity} coins`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "bg-red-600 text-white px-3 py-1 rounded";

        removeButton.addEventListener("click", function () {
            cart = cart.filter(function (cartItem) {
                return cartItem.key !== item.key;
            });

            updateCart();
        });

        row.appendChild(text);
        row.appendChild(removeButton);
        cartItems.appendChild(row);
    });

    const total = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent = total;
}

document.querySelector("#clear-cart").addEventListener("click", function () {
    cart = [];
    updateCart();
});

document.querySelector("#checkout").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    cart.forEach(function (cartItem) {
        const existingBooster = inventory.find(function (item) {
            return item.key === cartItem.key;
        });

        if (existingBooster) {
            existingBooster.quantity += cartItem.quantity;
        } else {
            inventory.push({
                key: cartItem.key,
                name: cartItem.name,
                quantity: cartItem.quantity
            });
        }
    });

    localStorage.setItem("mythoriaInventory", JSON.stringify(inventory));

    alert("Order confirmed successfully! Good luck.");

    cart = [];
    updateCart();
});

updateCart();
