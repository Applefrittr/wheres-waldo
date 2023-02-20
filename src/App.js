import { ref, getDownloadURL, listAll } from "firebase/storage";
import { useEffect, useState, useRef } from "react";
import { getDocs, collection } from "firebase/firestore";
import Picture from "./components/Picture";
import Legend from "./components/Legend";
import GameOver from "./components/GameOver";
import Timer from "./components/Timer";
import AnimatePage from "./components/AnimatePage";

import "./styles/App.css";
import { motion, AnimatePresence } from "framer-motion";

function App(props) {
  // firebase data states
  const [pic, setPic] = useState("");
  const [charList, setCharList] = useState([]);
  const [charData, setCharData] = useState([]);
  // state array to hold found and tagged characters in the picture
  const [charsFound, setCharsFound] = useState([]);
  // following states used in dragging around our Legend component on screen
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [mouseDown, setMouseDown] = useState(false);
  const refTag = useRef();
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  // const firebaseConfig = {
  //   apiKey: "AIzaSyAtsn3IN3ptFzFQaEoXoRGSXibqjd2CuRo",
  //   authDomain: "where-s-waldo-cc4e8.firebaseapp.com",
  //   projectId: "where-s-waldo-cc4e8",
  //   storageBucket: "where-s-waldo-cc4e8.appspot.com",
  //   messagingSenderId: "107729072568",
  //   appId: "1:107729072568:web:36c68765b8d66cb3549f4d",
  // };

  // const app = initializeApp(firebaseConfig);
  // const storage = getStorage(app);
  // const db = getFirestore(app);
  const storage = props.storage;
  const db = props.db;

  // Download picture
  useEffect(() => {
    const picRef = ref(storage, "pokemon.jpg");
    const getUrl = async () => {
      const result = await getDownloadURL(picRef);
      setPic(result);
    };

    getUrl();
  }, [storage]);

  // Download character images and names
  useEffect(() => {
    const charRef = ref(storage, "pokemon");

    const getChars = async () => {
      const results = await listAll(charRef);
      const chars = results.items.map(async (itemRef) => {
        const charImg = await getDownloadURL(itemRef);
        const name = itemRef._location.path_.slice(8).slice(0, -4); // slice off the file directory and file type of to get just the file name
        return { name, charImg };
      });
      const test = await Promise.all(chars);
      setCharList(test);
    };

    getChars();
  }, [storage]);

  // Download character data (coordinates on the picture)
  useEffect(() => {
    const data = {};
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "characters"));
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        //console.log(doc.id, " => ", docData);
        data[docData.name] = docData;
      });
      setCharData(data);
    };
    getData();
  }, [db]);

  function found(char) {
    setCharsFound([...charsFound, char]);
  }

  useEffect(() => {
    if (charsFound.length === 3) {
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
  };

  const getTime = (count) => {
    setTime(count);
  };

  return (
    <AnimatePage>
      <div className="App">
        <div className="container" onMouseMove={handleMouseMove}>
          <Picture
            pic={pic}
            charList={charList}
            charData={charData}
            found={found}
          />
          <div className="nav">{!gameOver && <Timer getTime={getTime} />}</div>
          <div
            className="legend-container"
            ref={refTag}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
          >
            <Legend
              charsFound={charsFound}
              charList={charList}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
            />
          </div>
          <AnimatePresence>
            {gameOver && (
              <motion.div
                className="game-over"
                animate={{ x: 0, y: 0, scale: 1, rotate: -720 }}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                exit={{ x: 1000, y: 0, opacity: 0, rotate: 720 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  mass: 0.75,
                  stiffness: 75,
                }}
              >
                <GameOver newGame={newGame} time={time} db={db} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* <Scoreboard db={db}/> */}
      </div>
    </AnimatePage>
  );
}

export default App;
