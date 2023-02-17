import { Link } from "react-router-dom";
import "../styles/Home.css";
import AnimatePage from "./AnimatePage";

const Home = () => {
  return (
    <AnimatePage>
      <section className="home-page">
        <div className="home-container">
          <h1 className="home-name">PokeFind</h1>
          <div>Find all the Pokemon dispayed in the Pokedex. Click Start to begin!</div>
          <Link to="/pokefind">
            <button id="start">Start</button>
          </Link>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Home;
