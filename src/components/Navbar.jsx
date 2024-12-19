import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="nav">
            <ul className="navList">
                <li><Link to="/" style={{ textDecoration: "none" }}>Home</Link></li>
                <li><Link to="/list" style={{ textDecoration: "none" }}>List</Link></li>
            </ul>
        </nav>
    )
};

export default Navbar;
