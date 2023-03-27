import { Link } from "react-router-dom";
import AmountPicker from "./AmountPicker";
import "./Cart.scss";
import useHeadingUpdate from "./useHeadingUpdate";

const Cart = ({ items, changeAmount, deleteProduct, sumTotal, setPage }) => {
    const cartHeader = (
        <div className="cart-header">
            <button
                className="delete-all"
                onClick={() => {
                    deleteProduct(null, true);
                }}
            >
                Clear cart
            </button>
        </div>
    );

    const cartContent = (
        <>
            <CartItemsHeader />
            <ul className="item-lines">
                {items.map((item) => {
                    return (
                        <CartItemLine
                            key={item.item.id}
                            item={item}
                            changeAmount={changeAmount}
                            deleteProduct={deleteProduct}
                        />
                    );
                })}
            </ul>
        </>
    );

    useHeadingUpdate("shopping cart", setPage);

    return (
        <div className="cart">
            {items.length > 0 ? (
                // If items
                <>
                    {cartHeader}
                    <div className="cart-items">{cartContent}</div>
                    <CartSummary sum={sumTotal} />
                </>
            ) : (
                // If empty cart
                <div className="no-items">Your cart is empty.</div>
            )}
        </div>
    );
};

const CartItemsHeader = () => {
    return (
        <div className="cart-items-header">
            <div></div>
            <div></div>
            <div className="col heading-amount">Amount</div>
            <div className="col heading-price">Price</div>
            <div className="col heading-total-price">Total</div>
            <div className="col heading-delete">Delete</div>
        </div>
    );
};

const CartItemLine = ({ item, changeAmount, deleteProduct }) => {
    const handleChangeAmount = (amount) => {
        changeAmount(item.item, amount - item.amount);
    };
    const handleDelete = () => {
        deleteProduct(item.item);
    };

    return (
        <li className="item-line">
            <div className="image">
                <Link to={`/items/${item.item.id}`}>
                    <img src={item.item.image} alt={item.name} />
                </Link>
            </div>
            <div className="text">
                <div className="item-name">{item.item.title}</div>
                <div className="description">{item.item.description}</div>
            </div>
            <div className="col amount">
                <AmountPicker
                    amount={item.amount}
                    onChange={handleChangeAmount}
                />
            </div>
            <div className="col price">{item.item.price}</div>
            <div className="col total-price price">
                {(item.amount * item.item.price).toFixed(2)}
            </div>
            <div className="col delete">
                <button className="button-delete" onClick={handleDelete}>
                    &times;
                </button>
            </div>
        </li>
    );
};

const CartSummary = ({ sum }) => {
    const amountForFreeShipping = 200;
    const remaining = (amountForFreeShipping - sum).toFixed(2);
    const freeShipping = sum >= amountForFreeShipping;

    const barStyle = {
        width: `${freeShipping ? 100 : (sum / amountForFreeShipping) * 100}%`,
    };

    return (
        <div className="summary">
            <div className="total-price">Sum total: ${sum}</div>
            <div className="free-shipping-progress">
                <div className="text">
                    {freeShipping
                        ? "Order qualifies for free shipping"
                        : `$${remaining} left for free shipping`}
                </div>
                <div className="bar-wrapper">
                    <div className="bar" style={barStyle}></div>
                    <div className="bar-text">{freeShipping ? "🎉" : `$${sum} / $${amountForFreeShipping}`}</div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
