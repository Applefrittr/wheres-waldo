import { useState, useRef } from "react";
import Tag from "./Tag.js";
import "../styles/Picture.css";

const Picture = (props) => {
  const [coor, setCoor] = useState({});
  const tagRef = useRef();

  const hide = () => {
    tagRef.current.classList.add("hide");
  };

  const clicked = (e) => {
    const top = ((e.pageY - 67) / e.target.clientHeight) * 100;
    const left = (e.pageX / window.innerWidth) * 100;
    console.log("top,left", [top, left], e, e.target.offsetWidth, window.innerWidth);
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
