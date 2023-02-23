import { useEffect, useState } from "react";
import "../styles/Tag.css";

// tagging component that gets rendered where ever the user clicks on the screen.  Coordinates are passed from the Picture component.  Renders a box where the user
// can choose from characters in a list to tag on the picture.  Char short for character
const Tag = (props) => {
  const [tags, setTags] = useState([]);

  // Create an array of <li> elements (the tags).  This side effect fires everytime the prop values left and/or top change
  // to ensure the tag() has the updated prop values
  useEffect(() => {
    const listElements = [];
    props.toFind.forEach((char) => {
      listElements.push(
        <li key={char.name} onClick={tag} id={char.name} className="tag-item">
          <img src={char.charImg} alt="pokemon" id={char.name}/>
          {char.name}
        </li>
      );
    });
    setTags(listElements)
  }, [props.left, props.top]);

  // tag function compares the current left and top prop values to the bounds of each character object retrieved from props.charData
  const tag = (e) => {
    //console.log(props.top, props.left)
    const charTag = e.target.id;
    if (
      props.charData[charTag].leftBound <= props.left &&
      props.left <= props.charData[charTag].rightBound &&
      props.charData[charTag].topBound <= props.top &&
      props.top <= props.charData[charTag].bottomBound
    ) {
      console.log("YES!");
      props.found(charTag)
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
