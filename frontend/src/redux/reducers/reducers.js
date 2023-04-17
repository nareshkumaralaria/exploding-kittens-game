import * as types from '../types';
import { combineReducers } from 'redux';

// Define initial state
const initialState = {
    cardArray: [],
    cardFlipped: 'Flip the Card',
    defuseCardNumber: 0,
    res: '',
    isGameStarted: false,
    isGameWon: false,
    isGameLost: false,
};

// Define reducer function to update state based on actions
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_GAME:
            return {
                ...state,
                cardArray: action.payload.deck,
                cardFlipped: 'Draw the Card',
                defuseCardNumber: 0,
                res: 'New Cards Added',
                isGameStarted: true,
                isGameWon: false,
                isGameOver: false,
                isGameLost: false,
                playerName: action.payload.name
            };
        case types.FLIPPED_CARD:
            const { cardFlipped } = action.payload;
            return {
                ...state,
                cardFlipped
            };
        case types.REMOVE_CARD:
            const { deck } = action.payload;
            return {
                ...state,
                cardArray: deck
            };
        case types.DEFUSE_CARD:
            const { defuseCardNumber, res } = action.payload;
            return {
                ...state,
                defuseCardNumber,
                res
            };
        case types.CAT_CARD:
            return {
                ...state,
                res: 'Safe For Now'
            };
        case types.SHUFFLE_CARD:
            return {
                ...state,
                res: 'Cards Will be Shuffled Again'
            };
        case types.GAME_OVER:
            return {
                ...state,
                res: 'GAME LOST, click to restart button to restart the game',
                isGameLost: true
            };
        case types.GAME_WON:
            return {
                ...state,
                res: 'GAME WON, click to restart button to play again',
                isGameWon: true
            };
        default:
            return state;
    }
};

// Combine reducers
export default combineReducers({ card: reducer });