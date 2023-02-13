import { useEffect, useState } from "react";
import "../styles/Tag.css";
import { ref, getDownloadURL, listAll } from "firebase/storage";

// tagging component that gets rendered where ever the user clicks on the screen.  Coordinates are passed from the Picture component.  Renders a box where the user
// can choose from characters in a list to tag on the picture.  Char short for character
const Tag = (props) => {
  const [chars, setChars] = useState([]);
  const [tags, setTags] = useState([]);

  // retrieve all image files in the firebase storage directory "pokemon", iterate through that list of files and download the images and create a object
  // with the file name and imgage path as object properties.  Set the state variable pokemon to an array of these objects
  useEffect(() => {
    const charRef = ref(props.storage, "pokemon");
    const charObjs = [];

    const getPokemon = async () => {
      const results = await listAll(charRef);
      results.items.forEach(async (itemRef) => {
        const name = itemRef._location.path_.slice(8).slice(0, -4); // slice off the file directory and file type of to get just the file name
        const charImg = await getDownloadURL(itemRef);
        charObjs.push({ name, charImg });
      });
      setChars(charObjs);
    };

    getPokemon();
  }, []);

  // Using the state variable pokemon, create an array of <li> elements (the tags).  This side effect fires everytime the prop values left and/or top change
  // to ensure the tag() has the updated prop values
  useEffect(() => {
    const listElements = [];
    chars.forEach((char) => {
      listElements.push(
        <li key={char.name} onClick={tag} id={char.name}>
          <img src={char.charImg} alt="pokemon" id={char.name}/>
          {char.name}
        </li>
      );
    });
    setTags(listElements)
  }, [props.left, props.top]);

  // tag function compares the current left and top prop values to the bounds of each character object retrieved from props.data
  const tag = (e) => {
    const charTag = e.target.id;
    if (
      props.data[charTag].leftBound <= props.left &&
      props.left <= props.data[charTag].rightBound &&
      props.data[charTag].topBound <= props.top &&
      props.top <= props.data[charTag].bottomBound
    ) {
      console.log("YES!");
    } else {
      console.log("No!");
    }
  };

  return (
    <div
      className="tag"
      style={{ left: props.left + "%", top: props.top + "%" }}
      id={props.id}
      onClick={props.hide}
    >
      {tags}
    </div>
  );
};
export default Tag;
