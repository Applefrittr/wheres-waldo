import { useState, useEffect } from "react";

// Timer component which sets up an interval to update the time state every second, which then updates the time state in the App component using App's getTime method
// Since this component gets conditionally rendered depending on App's gameOver state, our interval gets cleared on dismount, preventing the time interval from 
// running indefinetly.
const Timer = (props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
        setTime((oldTime) => oldTime + 1)
    }, 1000);
    return () => {  
        clearInterval(id)
    }
  }, []);

  useEffect(() => {
    props.getTime(time)
  }, [time])

  return(
    <span id="timer">Timer: {timeDisplay(time)}</span>
  )
};

export default Timer;

export function timeDisplay(input) {
  return `${Math.floor(input / 60)}:${input % 60 < 10 ? '0' : ''}${input % 60}`
}
