import { useEffect } from "react";
import { useState } from "react";

import "./App.css";

function App() {
  const [cards, setCards] = useState([]);

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
      .then((data) => console.log(data))

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <p>{cards.length}</p>
    </>
  );
}

export default App;
