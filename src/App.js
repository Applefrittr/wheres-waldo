import { initializeApp } from "firebase/app";
import Picture from "./components/Picture"
import "./styles/App.css"

function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyAtsn3IN3ptFzFQaEoXoRGSXibqjd2CuRo",
    authDomain: "where-s-waldo-cc4e8.firebaseapp.com",
    projectId: "where-s-waldo-cc4e8",
    storageBucket: "where-s-waldo-cc4e8.appspot.com",
    messagingSenderId: "107729072568",
    appId: "1:107729072568:web:36c68765b8d66cb3549f4d",
  };

  const app = initializeApp(firebaseConfig);

  //console.log(app)
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <Picture firebase={app} />
    </div>
  );
}

export default App;
