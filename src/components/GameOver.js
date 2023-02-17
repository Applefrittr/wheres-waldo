import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore"
import { useRef } from "react"
import { timeDisplay } from "./Timer";
import "../styles/GameOver.css";

const GameOver = (props) => {

  const inputRef = useRef()
  
  const addScore = async (e) => {
    const db = props.db
    await addDoc(collection(db, "users"), {
      time: props.time,
      name: inputRef.current.value
    })
    e.target.disabled = true
  }

  return (
    <motion.section
      className="new-game-popup"
      animate={{
        height: [0, 1800, 1850, 1900 ],
        width: [0, 1800, 1850, 1900 ],
        backgroundColor: ["rgb(250,0,0)", "rgb(250, 250, 250)", "rgb(250, 250, 250)", "rgba(250, 250, 250, 0)"],
        opacity: [1, 1, 1]
      }}
      initial={{ height: 0, width: 0, backgroundColor: "red", opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
    >
      <motion.div
        className="new-game-container"
        animate={{opacity:1}}
        initial={{opacity:0}}
        transition={{delay: 2.8, duration: .5}}
        >
          <div>Game Over</div>
          <form id="score-form">
            <label htmlFor="user">High Score!</label>
            <div>
              <input id="user" placeholder="Username" ref={inputRef}></input>
              <button type="button" onClick={addScore}>Submit</button>
            </div>
          </form>
          <span>Time to complete: {timeDisplay(props.time)}</span>
          <button onClick={props.newGame}>New Game</button>
      </motion.div>
    </motion.section>
  );
};

export default GameOver;
