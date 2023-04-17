# Exploding Kittens Game
This is an online single-player card game that consists of 4 different types of cards:

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

# Game rules

- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is an exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

# How to run this project locally

## Requirements
- Node.js (v12 or higher)
- Redis server (v5 or higher)

# Installation

- Clone the repository to your local machine:
```bash
git clone https://github.com/nareshkumaralaria/exploding-kittens-game.git

```
## Front-end

- Install the dependencies:
```bash
cd exploding-kittens-game
cd frontend
npm install

```
- Start the server:
```bash
npm run dev

```
- Open a browser and go to http://127.0.0.1:5173/ to start playing the game.

## Back-end

- Install the dependencies:

```bash
cd exploding-kittens-game
cd backend
npm install

```
- Start the server:
```bash
node index.js
```
Now your frontend and backend both are started.

Note: If you don't have Redis installed, you can download it from the official website: https://redis.io/download

# Gameplay

- Enter your username to start the game.
- Click the "Start Game" button to begin.
- Click the "Draw the Card" button to reveal a card from the deck.
- Follow the rules based on the type of card drawn.
- Keep drawing cards until all 5 cards are revealed.
- If you draw an exploding kitten and have a defuse card, you can use the defuse card to continue the game.
- Once the game is over, your score will be added to the leaderboard.
- You can view the leaderboard on the same page.

# Technologies Used

## Frontend
- React
- Redux

## Backend
- Node.js
- TypeScript
- Redis

## Authors

- [@nareshkumaralaria](https://github.com/nareshkumaralaria) (Naresh Kumar)
