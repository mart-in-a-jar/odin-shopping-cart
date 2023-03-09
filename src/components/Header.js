import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <nav>
            <ul className="menu">
                <NavLink to="/">
                    <li>Home</li>
                </NavLink>
                <NavLink to="/items">
                    <li>Items</li>
                </NavLink>
                <NavLink to="/cart">
                    <li>
                        
                    </li>
                </NavLink>
            </ul>
        </nav>
    );
};

export default Header;
