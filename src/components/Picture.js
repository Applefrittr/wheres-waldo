import { useState, useRef } from "react";
import Tag from "./Tag.js";
import "../styles/Picture.css";

// Component renders the main picture and also controls where the Tag component gets rendered on the screen (where the user clicks to tag)
const Picture = (props) => {
  // coordinate state object which will store percentage values to be used in the CSS properties "left" and "top" of the Tag component to aboslutely position Tag
  // relative to this (Picture) component
  const [coor, setCoor] = useState({});
  const tagRef = useRef();

  // hide fuction passed to the Tag component, will add CSS class "hide" to Tag component when the user tags a character in the picture
  const hide = () => {
    tagRef.current.classList.add("hide");
  };

  // fuction to determine cursor coordinates using the Event object
  const clicked = (e) => {
    const top = ((e.pageY - 67) / e.target.clientHeight) * 100;  // "67" is the pixel height of the Nav component
    // target the scrollable div "container" and amount of pixels scrolled to the left to added to our pageX event value.  RESPONSIVE degsign change for smaller screens
    const left = ((e.pageX + e.target.parentElement.parentElement.scrollLeft)/ e.target.clientWidth) * 100 
    console.log("top,left", [top, left], e.pageX, e.target.clientWidth, e.target.parentElement.clientWidth, left, e.target.offsetLeft);
    console.log(e.target.parentElement.parentElement.scrollLeft)
    setCoor({ top, left });
    tagRef.current.classList.remove("hide");
  };

  return (
    <div id="picture-container">
      <img
        src={props.pic}
        alt="Pic imported from firebase"
        id="firebase-image"
        onClick={clicked}
      ></img>
      <div id="tag-container" className="hide" ref={tagRef}>
          <Tag
          top={coor.top}
          left={coor.left}
          id="test"
          hide={hide}
          key="test"
          charList={props.charList}
          charData={props.charData}
          found = {props.found}
        />
      </div>
    </div>
  );
};

export default Picture;
