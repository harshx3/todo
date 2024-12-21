import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <h1>Todo App</h1>
                </div>
                <div className="nav-links">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/list"}
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    >
                        All Todos
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;