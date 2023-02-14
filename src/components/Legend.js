import { useEffect, useState } from "react";
import "../styles/Legend.css";

const Legend = (props) => {

    //console.log(props.charList)
//   const [legend, setLegend] = useState([]);

//     useEffect(() => {
//       const legend = [];

//       props.charList.forEach((char) => {
//         legend.push(
//           <div
//             key={char.name}
//             className={`legend-item ${
//               props.charsFound.includes(char.name) ? "found" : ""
//             }`}
//           >
//             <img src={char.charImg} alt="pokemon" id={char.name} />
//             {char.name}
//           </div>
//         );
//         setLegend(legend);
//       });
//     }, [props.charsFound]);

    const legend = [];

    props.charList.forEach((char) => {
      legend.push(
        <div
          key={char.name}
          className={`legend-item ${
            props.charsFound.includes(char.name) ? "found" : ""
          }`}
        >
          <img src={char.charImg} alt="pokemon" id={char.name} />
          {char.name}
        </div>
      );
    });

    
  
  return <section className="legend">{legend}</section>;
};

export default Legend;
