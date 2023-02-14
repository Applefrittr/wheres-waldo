import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import Picture from "./components/Picture";
import Legend from "./components/Legend";
import "./styles/App.css";

function App() {
  const [pic, setPic] = useState("");
  const [charList, setCharList] = useState([]);
  const [charData, setCharData] = useState([]);
  const [charsFound, setCharsFound] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const firebaseConfig = {
    apiKey: "AIzaSyAtsn3IN3ptFzFQaEoXoRGSXibqjd2CuRo",
    authDomain: "where-s-waldo-cc4e8.firebaseapp.com",
    projectId: "where-s-waldo-cc4e8",
    storageBucket: "where-s-waldo-cc4e8.appspot.com",
    messagingSenderId: "107729072568",
    appId: "1:107729072568:web:36c68765b8d66cb3549f4d",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const db = getFirestore(app);

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
    //const charObjs = [];

    const getChars = async () => {
      const results = await listAll(charRef);
      const chars = results.items.map(async (itemRef) => {
          const charImg = await getDownloadURL(itemRef);
          const name = itemRef._location.path_.slice(8).slice(0, -4); // slice off the file directory and file type of to get just the file name
          return { name, charImg };
        })
      const test = await Promise.all(chars)
      setCharList(test)
      // results.items.forEach(async (itemRef) => {
      //   const name = itemRef._location.path_.slice(8).slice(0, -4); // slice off the file directory and file type of to get just the file name
      //   const charImg = await getDownloadURL(itemRef);
      //   charObjs.push({ name, charImg });
      // });
      // setCharList(charObjs);
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

  const test = () => {
    console.log(charsFound);
  };
  // console.log(app)

  return (
    <div className="App">
      <div className="nav">
        <h1>Hello World!</h1>
        <button onClick={test}>Click</button>
      </div>
      <Picture
        pic={pic}
        charList={charList}
        charData={charData}
        found={found}
      />
      <Legend charsFound={charsFound} charList={charList} />
    </div>
  );
}

export default App;
