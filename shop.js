
const boosters = {
  standard: {
    name: "Hunter's Journey",
    price: 2,
    cards: [
      "images/std1.png",
      "images/std2.png",
      "images/std3.png",
      "images/std4.png",
      "images/std5.png"
    ]
  },

  good: {
    name: "Heaven's Path",
    price: 10,
    cards: [
      "images/good1.png",
      "images/good2.png",
      "images/good3.png",
      "images/good4.png",
      "images/good5.png"
    ]
  },

  legendary: {
    name: "King's Awakening",
    price: 50,
    cards: [
      "images/legend1.png",
      "images/legend2.png",
      "images/legend3.png",
      "images/legend4.png",
      "images/legend5.png"
    ]
  },

  phantom: {
    name: "Phantom Troupe",
    price: 15,
    cards: [
      "images/phantom1.png",
      "images/phantom2.png",
      "images/phantom3.png",
      "images/phantom4.png",
      "images/phantom5.png"
    ]
  }
};

let cart = JSON.parse(localStorage.getItem("mythoriaCart")) || [];

const buttons = document.querySelectorAll(".add-to-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const key = button.dataset.booster;
    const booster = boosters[key];

    if (!booster) return;

    const quantityInput =
      button.parentElement.querySelector(".quantity");

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
    removeButton.className =
      "bg-red-600 text-white px-3 py-1 rounded";

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

