import React from "react"
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav"
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import RoutePaths from "./components/RoutePaths";

// Browser router for our App, initialize firebase and pass firestore and database references down the component tree
const RouteSwitch = () => {

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
    
    return(
        <BrowserRouter>
            <Nav />
            <RoutePaths storage={storage} db={db}/>
        </BrowserRouter>
    )
}

export default RouteSwitch