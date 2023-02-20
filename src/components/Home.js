import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import AnimatePage from "./AnimatePage";

const Home = () => {
  const [help, setHelp] = useState(false)

  const howToPlay = () => {
    setHelp(!help)
  }

  return (
    <AnimatePage>
      <section className="home-page">
        <div className="home-container">
          <h1 className="home-name">PokeFind</h1>
          <div id="button-container">
            <Link to="/pokefind" id="start-link">
              <button className="homepage-buttons">Start</button>
            </Link>
            <button className="homepage-buttons" onClick={howToPlay}>How to Play</button>
          </div>
          <AnimatePresence>
            {help && <AnimatePage>
              <section id="help-container">
                <div>- Find the 3 random Pokemon displayed in the Pokedex as fast as possible</div>
                <div>- Click on the image then tag the correct Pokemon in the popup</div>
                <div>- Click start to begin, timer starts right after page load</div>
                <div>- Click on Home in the navigation bar to return here to start again</div>
                <div>- Add you name to the list of Pokemon Masters!  Aim for one of the Top 10 spots</div>
                <div> *Tip - You can click and drag the Pokedex around the screen.</div>
                <div> ** On smaller screens, the Pokedex is fixed at the bottom</div>
              </section>
            </AnimatePage>}
          </AnimatePresence>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Home;
