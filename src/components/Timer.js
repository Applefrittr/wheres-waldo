import { useState, useEffect } from "react";

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
