import { useEffect, useState, useRef } from "react";
import Picture from "./components/Picture";
import Legend from "./components/Legend";
import GameOver from "./components/GameOver";
import Timer from "./components/Timer";
import AnimatePage from "./components/AnimatePage";
import "./styles/App.css";
import { motion, AnimatePresence } from "framer-motion";
import Azalea from "./Assets/Sounds/AzaleaTown.mp3";

function App(props) {
  // state array to hold the characters to find
  const [toFind, setToFind] = useState([]);
  // state array to hold found and tagged characters in the picture
  const [charsFound, setCharsFound] = useState([]);
  // following states used in dragging around our Legend component on screen
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [mouseDown, setMouseDown] = useState(false);
  const refTag = useRef();
  // gameOver state used to determine game end, time to record length of game
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const audio = useRef();

  useEffect(() => {
    audio.current = new Audio(Azalea);
    audio.current.loop = true;
    audio.current.play();
    return () => {
      audio.current.pause();
    };
  }, []);

  useEffect(() => {
    // gameOver ? audio.current.pause() : audio.current.play()
    if (gameOver) {
      const decrease = setInterval(() => {
        audio.current.volume -= 0.2;
      }, 200);
      setTimeout(() => {
        clearInterval(decrease);
        audio.current.pause();
      }, 1000);
    } else {
      setTimeout(() => {
        audio.current.play();
        const increase = setInterval(() => {
          audio.current.volume += 0.2;
        }, 200);
        setTimeout(() => {
          clearInterval(increase);
        }, 1000);
      }, 1000);
    }
  }, [gameOver]);

  // Call createToFindList when App.js is mounted
  useEffect(() => {
    createToFindList();
  }, []);

  // Change this, tagging same pokemon three times to win game
  useEffect(() => {
    const set = new Set(charsFound);
    if (set.size === 3) {
      console.log("Found them All!");
      setGameOver(true);
    }
  }, [charsFound]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    refTag.current.classList.toggle("drag");
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    refTag.current.classList.toggle("drag");
    setMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (mouseDown) {
      const height = refTag.current.offsetHeight;
      const width = refTag.current.offsetWidth;
      setPosition({ top: e.pageY - height / 2, left: e.pageX - width / 2 });
      console.log(e.pageY, height, width);
    }
  };

  const newGame = () => {
    setCharsFound([]);
    setGameOver(false);
    createToFindList();
  };

  // method passed as a prop to the Timer component to keep track of game length
  const getTime = (count) => {
    setTime(count);
  };

  const found = (char) => {
    setCharsFound([...charsFound, char]);
  };

  // Function which takes our charList prop retrieved from Firebase and pulls 3 random characters from list and sets them to the toFind state
  const createToFindList = () => {
    const copyCharList = [...props.charList];
    const list = [];

    while (list.length < 3) {
      let index = Math.floor(Math.random() * copyCharList.length);
      list.push(copyCharList[index]);
      copyCharList.splice(index, 1);
    }
    setToFind(list);
  };

  return (
    <AnimatePage>
      <div className="App">
        <div className="nav">{!gameOver && <Timer getTime={getTime} />}</div>
        <div className="container" onMouseMove={handleMouseMove}>
          <Picture
            pic={props.pic}
            toFind={toFind}
            charData={props.charData}
            found={found}
          />
          <div
            className="legend-container"
            ref={refTag}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
          >
            <Legend
              charsFound={charsFound}
              toFind={toFind}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
            />
          </div>
          <AnimatePresence>
            {gameOver && (
              <motion.div
                className="game-over"
                animate={{ x: -250, y: -250, scale: 1, rotate: -720 }}
                initial={{ x: -250, y: -250, scale: 0, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  mass: 0.75,
                  stiffness: 75,
                  duration: 1,
                }}
              >
                <GameOver newGame={newGame} time={time} db={props.db} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatePage>
  );
}

export default App;
