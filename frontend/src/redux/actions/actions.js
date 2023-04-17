// Importing all the action types from the types.js file
import * as types from '../types';

// Function to generate the initial deck of cards
const makeCard = () => {
    const cards = {
        1: 'Cat card',
        2: 'Defuse card',
        3: 'Shuffle card',
        4: 'Exploding kitten card'
    };
    let deck = [];
    const numberOfCard = 5;
    for (let i = 0; i < numberOfCard; i++) {
        deck.push(cards[Math.floor(Math.random() * (5 - 1) + 1)]);
    }
    return deck;
};

// Action to start the game
export const startGame = (name) => {
    return { type: types.START_GAME, payload: { deck: makeCard(), name } };
};

// Action to remove the card that was flipped from the deck
export const removeCard = (deck) => {
    const newDeck = deck.slice(0, -1); // create a new copy of the deck array without the last item
    return { type: types.REMOVE_CARD, payload: { deck: newDeck } };
};

// Action to indicate that a card has been flipped over
export const flippedCard = cardFlipped => {
    return { type: types.FLIPPED_CARD, payload: { cardFlipped } };
};

// // Action to use the defuse card to defuse an exploding kitten card
export const defuseCard = (defuseCardNumber, res) => {
    return { type: types.DEFUSE_CARD, payload: { defuseCardNumber, res } };
};

// Action to handle a cat card being drawn from the deck
export const catCard = () => {
    return { type: types.CAT_CARD };
};

// Action to handle a shuffle card being drawn from the deck
export const shuffleCard = () => {
    return { type: types.SHUFFLE_CARD };
};

// Action to handle the game being over
export const gameOver = () => {
    return { type: types.GAME_OVER };
};

// Action to handle the player winning the game
export const gameResult = () => {
    return { type: types.GAME_WON };
};

