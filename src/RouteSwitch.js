import React from "react";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import RoutePaths from "./components/RoutePaths";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { getDocs, collection } from "firebase/firestore";

// Browser router for our App, initialize firebase and pass firestore and database references down the component tree
const RouteSwitch = () => {
  // firebase data states
  const [pic, setPic] = useState(""); // pic is picture to be used for the tagging app
  const [charList, setCharList] = useState([]); // charList is the 3 characters to be tagged in the photo
  const [charData, setCharData] = useState([]); // charData is the coordiante data of the characters in the photo

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
        data[docData.name] = docData;
      });
      setCharData(data);
    };
    getData();
  }, [db]);

  return (
    <BrowserRouter basename="/wheres-waldo">
      <Nav />
      <RoutePaths pic={pic} charList={charList} charData={charData} db={db} />
    </BrowserRouter>
  );
};

export default RouteSwitch;
