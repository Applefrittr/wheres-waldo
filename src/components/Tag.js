import { useEffect, useState } from "react";
import "../styles/Tag.css";
import { ref, getDownloadURL } from "firebase/storage";

const Tag = (props) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const pikaRef = ref(props.storage, "pikachu.png");
    const jigglyRef = ref(props.storage, "jigglypuff.png");
    const clefRef = ref(props.storage, "clefairy.png");
    const getPokemon = async () => {
      const pikachu = await getDownloadURL(pikaRef);
      const jigglypuff = await getDownloadURL(jigglyRef);
      const clefairy = await getDownloadURL(clefRef);

      setPokemon({
        pikachu,
        jigglypuff,
        clefairy,
      });
    };

    getPokemon();
  }, []);


  return (
    <div
      className="tag"
      style={{ left: props.left, top: props.top }}
      id={props.id}
      onClick={props.hide}
    >
      <li>
        <img src={pokemon.jigglypuff} alt="place holder" /> Jigglypuff
      </li>
      <li>
        <img src={pokemon.pikachu} alt="place holder" /> Pikachu
      </li>
      <li>
        <img src={pokemon.clefairy} alt="place holder" /> Clefairy
      </li>
    </div>
  );
};
export default Tag;
