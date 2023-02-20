import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore"
import { useRef } from "react"
import { timeDisplay } from "./Timer";
import "../styles/GameOver.css";
import { Link } from "react-router-dom"

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
          <h1><i>Found 'em All!</i></h1>
          <form id="score-form">
            <label htmlFor="user">Pokemon Master</label>
            <div id="user-input">
              <input id="user" placeholder="Username" ref={inputRef}></input>
              <button type="button" onClick={addScore} className="gameover-buttons">Submit</button>
            </div>
          </form>
          <span><i>Time to complete:</i> {timeDisplay(props.time)}</span>
          <button onClick={props.newGame} className="gameover-buttons">New Game</button>
      </motion.div>
    </motion.section>
  );
};

export default GameOver;
