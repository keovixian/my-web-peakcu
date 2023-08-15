import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [name, setName] = useState("eevee");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isloading, setIsloading] = useState(false);

  async function getPokemon() {
    setIsloading(true);
    try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemonData = await res.json();
      setData(pokemonData);
    } catch (err) {
      setData(false);
      setErr(true);
    } finally {
      setIsloading(false);
    }
    
  }

  useEffect(() => {
    getPokemon();
    console.log(data);
  }, []);

  console.log(name);

  function handleSubmit(e) {
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-indigo-800">
      <div className="bg-white text-center rounded-3xl border.shadow-lg p-10 max-w-xs">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="p-3 border-solid border-2 border-indigo-600 rounded-md"
            placeholder="Searcy by name"
          />
          <button className="bg-indigo-600 px-2 mt-5 text-lg rounded-gray-100">
            Search
          </button>
        </form>

        {err ? (
          <p className="my-5">No data was fouond!</p>
        ) : (
          <>
            {isloading ? (
              <p className="my-5">Loading...</p>
            ) : (
              <>
                <img
                  className="my-5 w-50 h-50 rounded-lg shadow-lg mx-auto"
                  alt={`${data.name}`}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                />
                <hi className="text-lg text-gray-700">Pokemon: {data.name}</hi>
                <h3 className="text-md text-gray-500">weight: {data.weight}</h3>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
