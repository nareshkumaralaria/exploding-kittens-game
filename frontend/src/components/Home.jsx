import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { startGame, flippedCard, catCard, defuseCard, gameOver, shuffleCard, gameResult, removeCard } from '../redux/actions/actions'

const Home = () => {

    const dispatch = useDispatch();
    const card = useSelector(state => state.card);
    const { cardFlipped, cardArray, defuseCardNumber, res, isGameWon, isGameLost, isGameStarted, playerName } = card;
    const [name, setName] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);

    // Get all the leaderboard data from backend
    const getAllData = async () => {
        const response = await axios.get('http://localhost:9002/leaderboard')
        console.log("response :", response);
        setLeaderboard(response.data.result);
    }

    // Start the game
    const startTheGame = async () => {
        if (name !== "") {
            dispatch(startGame(name));
            await axios.post('http://localhost:9002/setPlayer', { name });
            getAllData();
        }
        else {
            alert("Please Enter your Name");
        }
    }

    // Function to handle deck click event
    const clickOnDeck = async () => {
        let len = cardArray?.length - 1;
        const topCard = cardArray[len];
        dispatch(flippedCard(topCard));
        if (topCard === 'Cat card') {
            dispatch(catCard());
        }
        if (topCard === 'Defuse card') {
            dispatch(defuseCard(defuseCardNumber + 1, 'Added Defuse Card'));
        }
        if (topCard === 'Exploding kitten card') {
            if (defuseCardNumber !== 0) {
                dispatch(defuseCard(defuseCardNumber - 1, 'Defuse Card Used'));
            }
            else {
                dispatch(gameOver());
            }
        }
        if (topCard === 'Shuffle card') {
            dispatch(shuffleCard());
            setTimeout(() => dispatch(startGame(name)), 1300);
        }
        if (cardArray.length === 0) {
            dispatch(gameResult());
            await axios.post("http://localhost:9002/updateScore", { name })
            getAllData();
        }
        dispatch(removeCard(cardArray));
    }

    // Load leaderboard data when component mounts
    useEffect(() => {
        getAllData();
    }, [])

    // Render the component
    return (
        <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="home" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: "250px" }}>

                {/* If the game has not started yet, show name input and start game button */}
                {
                    !isGameStarted && <div style={{ margin: "24px 0", display: "flex", flexDirection: "column" }}>
                        <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <button style={{ margin: "4px 0" }} onClick={startTheGame}>Start Game</button>
                    </div>
                }

                {/* If the game has started, show restart game button */}
                {
                    isGameStarted && <button onClick={startTheGame}>Restart Game</button>
                }

                {/* If the game has started and player name is set, show player name */}
                {
                    isGameStarted && playerName !== '' && <div style={{ margin: "24px 0" }}>Your Name: {playerName}</div>
                }

                {/* If the game has started, is not lost, and is not won, it displays a div containing information about the flipped card, the number of cards left in the deck, the result of the previous action, and the number of defuse cards remaining. It also displays a button that calls the clickOnDeck function to draw a card or see the result if the deck is empty. */}
                {
                    isGameStarted && !isGameLost && !isGameWon && <>
                        <div className="card-content" style={{ margin: "24px 0" }}>
                            <div>{cardFlipped}</div>
                            <div>Cards Left: {cardArray?.length}</div>
                            <div>{res}</div>
                            <div>You have {defuseCardNumber} Defuse cards</div>
                        </div>
                        <button onClick={clickOnDeck}>{cardArray?.length === 0 ? "See result" : "Draw the card"}</button>
                    </>
                }

                {/* If the game is lost, it displays a div containing the flipped card and the result of the game. */}
                {
                    isGameLost && <>
                        <div style={{ margin: "24px 0" }}>{cardFlipped}</div>
                        <div>{res}</div>
                    </>
                }

                {/* If the game is won, it displays a div containing the flipped card and the result of the game. */}
                {
                    isGameWon && <>
                        <div style={{ margin: "24px 0" }}>{cardFlipped}</div>
                        <div>{res}</div>
                    </>
                }

                {/* It also displays a leaderboard table that shows the names and number of games won of the players stored in the leaderboard array. */}
                <div className="leaderborad" style={{ margin: "24px 0" }}>
                    <p>Leaderboard: </p>
                    <table style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Games Won</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaderboard.map((item, idx) => {
                                    let key = Object.keys(item);
                                    return <tr key={idx + item[key[0]]}>
                                        <td>{key[0]}</td>
                                        <td>{item[key[0]]}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Home;