function flipCoin() {
    return Math.random() < 0.5 ? "player" : "opponent";
}

export { flipCoin };