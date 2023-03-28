import { NavLink } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";

const Header = ({ cartAmount, page }) => {
    // Animate cart icon on change
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 350);
    }, [cartAmount]);
    
    return (
        <header>
            <h2>{page}</h2>
            <nav className="header">
                <ul className="menu">
                    <NavLink to="/">
                        <li className="menu-item">Home</li>
                    </NavLink>
                    <NavLink to="/items/category/all-items">
                        <li className="menu-item">Items</li>
                    </NavLink>
                    <NavLink to="/cart">
                        <li>
                            <div className="cart-icon fa-layers fa-fw">
                                <FontAwesomeIcon
                                    icon={solid("cart-shopping")}
                                />
                                {cartAmount > 0 ? (
                                    <span
                                        className={
                                            "fa-layers-counter cart-amount" +
                                            (animate ? " animate" : "")
                                        }
                                    >
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
        </header>
    );
};

export default Header;
