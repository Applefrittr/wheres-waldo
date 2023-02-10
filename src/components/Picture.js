import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import Tag from "./Tag.js";
import "../styles/Picture.css";

const Picture = (props) => {
  const [pic, setPic] = useState("");
  const [tag, setTag] = useState([])
  const [coor, setCoor] = useState({})
  const tagRef = useRef()

  const storage = getStorage(props.firebase);
  const db = getFirestore(props.firebase);

  const picRef = ref(storage, "pokemon.jpg");
  const getUrl = async () => {
    const result = await getDownloadURL(picRef);
    setPic(result);
  };

  getUrl();

//   useEffect(() => {
//     const getData = async () => {
//       const dataArray = [];
//       const querySnapshot = await getDocs(collection(db, "characters"));
//       querySnapshot.forEach((doc) => {
//         const docData = doc.data();
//         console.log(doc.id, " => ", doc.data());
//         dataArray.push(
//           <Tag
//             top={docData.top}
//             left={docData.left}
//             id={docData.name}
//             key={docData.name}
//           />
//         );
//       });
//       setTagArray(dataArray);
//     };

//     getData();
//   }, []);


const hide = () => {
    tagRef.current.classList.add("hide")
}

const clicked = (e) => {
    console.log(e)
    const top = ((e.pageY - 39) / e.target.clientHeight) * 100 + "%"
    const left = e.pageX / e.target.clientWidth * 100 + "%"
    console.log([top,left])
    setCoor({top,left})
    tagRef.current.classList.remove("hide")
}



  return (
    <div id="picture-container">
      <img src={pic} alt="Pic imported from firebase" id="firebase-image" onClick={clicked}></img>
      {/* {tagArray} */}
      <div id="tag-container" className="hide" ref={tagRef}>
        <Tag top={coor.top} left={coor.left} id="test" hide = {hide} key="test" storage = {storage}/>
      </div>
    </div>
  );
};

export default Picture;
