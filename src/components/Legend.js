import "../styles/Legend.css";

const Legend = (props) => {
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

  return (
    <section className="legend" onMouseDown={props.handleMouseDown} onMouseUp={props.handleMouseUp}>
      Pokedex
      {legend}
    </section>
  );
};

export default Legend;

