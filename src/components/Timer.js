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
    <span>Timer: {time}</span>
  )
};

export default Timer;
