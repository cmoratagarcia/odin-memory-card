import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";
import Scoreboard from "./Scoreboard";
import "./App.css";

const CARD_COUNT = 12;

function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const promises = [];

    for (let i = 1; i <= CARD_COUNT; i++) {
      promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }

    Promise.all(promises)
      .then((responses) => {
        // Return a Promise that resolves with all parsed JSON data
        return Promise.all(responses.map((item) => item.json()));
      })
      .then((data) => {
        const pokemonCards = data.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.home.front_default,
        }));

        setCards(shuffle(pokemonCards));
      })
      .catch((error) => console.log(error));
  }, []);

  function handleClick(id) {
    if (hasWon) return;
    if (clickedIds.includes(id)) {
      setClickedIds([]);
    } else {
      const updatedIds = [...clickedIds, id];
      setClickedIds(updatedIds);

      if (updatedIds.length > bestScore) {
        setBestScore(updatedIds.length);
      }
      if (updatedIds.length === cards.length) {
        setHasWon(true);
      }
    }
    setCards(shuffle(cards));
  }

  function handlePlayAgain() {
    setClickedIds([]);
    setHasWon(false);
    setCards(shuffle(cards));
  }

  const cardElements = cards.map((item) => (
    <Card
      key={item.id}
      name={item.name}
      image={item.image}
      handleClick={() => handleClick(item.id)}
    />
  ));

  return (
    <>
      <main className="game">
        <header className="game-header">
          <div className="game-intro">
            <h1>Pokémon Memory Game</h1>
            <p className="game-instructions">Instructions...</p>
          </div>

          <Scoreboard currentScore={clickedIds.length} bestScore={bestScore} />
        </header>
        <section className="cards-container">{cardElements}</section>
      </main>
      {hasWon && (
        <dialog open>
          You won!'<button onClick={handlePlayAgain}>Play Again!</button>
        </dialog>
      )}
    </>
  );
}

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i >= 1; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
export default App;
