import { NavLink } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Header = ({ cartAmount }) => {
    return (
        <nav>
            <ul className="menu">
                <NavLink to="/">
                    <li className="menu-item">Home</li>
                </NavLink>
                <NavLink to="/items">
                    <li className="menu-item">Items</li>
                </NavLink>
                <NavLink to="/cart">
                    <li>
                        <div className="cart-icon fa-layers fa-fw">
                            <FontAwesomeIcon icon={solid("cart-shopping")} />
                            {cartAmount > 0 ? (
                                <span className="fa-layers-counter cart-amount">
                                    {cartAmount}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </li>
                </NavLink>
            </ul>
        </nav>
    );
};

export default Header;
