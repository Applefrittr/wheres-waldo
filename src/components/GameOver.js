import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { timeDisplay } from "./Timer";
import "../styles/GameOver.css";
import Victory from "../Assets/Sounds/Victory.mp3";
import Open from "../Assets/Sounds/pokeball-open.wav"

const GameOver = (props) => {
  const audio = useRef();
  const inputRef = useRef();

  // functionality for player to add his/her name to the scoreboard database, disables target button from continuous additions
  const addScore = async (e) => {
    const db = props.db;
    await addDoc(collection(db, "users"), {
      time: props.time,
      name: inputRef.current.value,
    });
    e.target.disabled = true;
  };
  
  useEffect(() => {
    audio.current = new Audio(Victory);
    setTimeout(() => {
      audio.current.play();
    }, 2250);

    return () => {
      audio.current.pause();
    };
  }, []);

  setTimeout(() => {
    const open = new Audio(Open)
    open.play()
  }, 1000)

  return (
    <motion.section
      className="expanding-animation"
      animate={{
        height: [0, 1800, 1850, 1900],
        width: [0, 1800, 1850, 1900],
        backgroundColor: [
          "rgb(250,0,0)",
          "rgb(250, 250, 250)",
          "rgb(250, 250, 250)",
          "rgba(250, 250, 250, 0)",
        ],
      }}
      initial={{ height: 0, width: 0, backgroundColor: "red", opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
    >
      <motion.div
        className="new-game-container"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 2.8, duration: 0.5 }}
      >
        <h1>
          <i>Found 'em All!</i>
        </h1>
        <form id="score-form">
          <label htmlFor="user">Pokemon Master</label>
          <div id="user-input">
            <input id="user" placeholder="Username" ref={inputRef}></input>
            <button
              type="button"
              onClick={addScore}
              className="gameover-buttons"
            >
              Submit
            </button>
          </div>
        </form>
        <span>
          <i>Time to complete:</i> {timeDisplay(props.time)}
        </span>
        <button onClick={props.newGame} className="gameover-buttons">
          New Game
        </button>
      </motion.div>
    </motion.section>
  );
};

export default GameOver;
