import { useEffect, useState } from "react"
import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";
import { timeDisplay } from "./Timer";

const Scoreboard = (props) => {
    const [scores, setScores] = useState([])
    const db = props.db

    useEffect(() => {
        const getScores = async () => {
            const q = query(collection(db, "users"), orderBy("time"), limit(10))
            const querySnapshot = await getDocs(q)
            const scoresArray = []

            querySnapshot.forEach((doc) => {
                const data = doc.data()
                scoresArray.push(<li key={doc.id}><span>Name: {data.name}</span><span>Time: {timeDisplay(data.time)}</span></li>)
            })
            setScores(scoresArray)
        }

        getScores()
    }, [])

    return (
        <section>
            <h1>High Scores</h1>
            <ol>
                {scores}
            </ol>
        </section>
    )
}

export default Scoreboard