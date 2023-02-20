import { Link } from "react-router-dom"
import "../styles/Nav.css"

const Nav = () => {
    return(
        <section className="nav-bar">
            <h1 className="nav-name">PokeFind</h1>
            <div className="nav-button-container">
                <Link to="/"><button className="nav-button">Home</button></Link>
                <Link to="/scoreboard"><button className="nav-button">Scoreboard</button></Link>
            </div>
        </section>
    )
}

export default Nav