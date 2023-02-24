import { useEffect, useRef, useState } from "react";
import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";
import { timeDisplay } from "./Timer";
import AnimatePage from "./AnimatePage";
import "../styles/Scoreboard.css";
import { motion } from "framer-motion";
import Masterball from "../Assets/masterball.png"
import Ultraball from "../Assets/ultraball.png"
import Greatball from "../Assets/greatball.png"
import Pokeball from "../Assets/pokeball-icon.png"
import Ending from "../Assets/Sounds/Ending.mp3"

// Scoreboard component will render out the users added to the firebase firestore data collection
const Scoreboard = (props) => {
  const [scores, setScores] = useState([]);
  const audio = useRef()
  const db = props.db;

  useEffect(() => {
    audio.current = new Audio(Ending)
    audio.current.play()
    return () => {
      audio.current.pause()
    }
  }, [])

  // fetch data from the "users" collection in firestore and render out an array of <li> elements which contain a ranking icon and the user info (name and time)
  useEffect(() => {
    const getScores = async () => {
      const q = query(collection(db, "users"), orderBy("time"), limit(10));
      const querySnapshot = await getDocs(q);
      const scoresArray = [];
      let rank = 1;
      let icon

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        switch(rank) {
          case 1:
            icon = Masterball
            break;
          case 2:
            icon = Ultraball
            break;
          case 3:
            icon = Greatball
            break
          default:
            icon = Pokeball
            break
        }
        scoresArray.push(
          <li key={doc.id} className="player-score">
            <div className="player-score-name">
              <img src={icon} alt=""></img>
              <span>
                <i>Trainer:</i> {data.name}
              </span>
            </div>
            <span>
              <i>Time:</i> {timeDisplay(data.time)}
            </span>
          </li>
        );
        rank++;
      });
      setScores(scoresArray);
    };

    getScores();
  }, []);

  return (
    <AnimatePage>
      <div id="score-board-container">
        <motion.section id="score-board" initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              duration: 0.75,
              type: "spring",
              delay: .5,
            }}>
          <h1 id="score-header">Pokemon Masters - Top 10</h1>
          <ol>
            {scores}
          </ol>
        </motion.section>
      </div>
    </AnimatePage>
  );
};

export default Scoreboard;
