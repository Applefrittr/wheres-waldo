import { easeInOut, motion } from "framer-motion";
import "../styles/GameOver.css";

const GameOver = (props) => {
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
          <span>Time to complete: {props.time}</span>
          <button onClick={props.newGame}>New Game</button>
      </motion.div>
    </motion.section>
  );
};

export default GameOver;
