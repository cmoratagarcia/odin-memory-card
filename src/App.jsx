import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const promises = [];

    for (let i = 1; i < 13; i++) {
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

        setCards(pokemonCards);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleClick(id) {
    if (clickedIds.includes(id)) {
      setClickedIds([]);
    } else {
      const updatedIds = [...clickedIds, id];

      setClickedIds(updatedIds);
      if (updatedIds.length > bestScore) {
        setBestScore(updatedIds.length);
      }
    }
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
    <main className="cards-container">
      {cardElements} <p>{clickedIds.length}</p>
      <p>{bestScore}</p>
    </main>
  );
}

export default App;
