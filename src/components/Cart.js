import { Link } from "react-router-dom";
import AmountPicker from "./AmountPicker";
import "./Cart.scss";
import useHeadingUpdate from "./useHeadingUpdate";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

const Cart = ({
    items,
    changeAmount,
    deleteProduct,
    sumTotal,
    setPage,
    setItemsPurchased,
    shippingPrice,
    shippingLimit,
}) => {
    const [showDescription, setShowDescription] = useState(false);
    const emptyCart = () => {
        deleteProduct(null, true);
    };
    const cartHeader = (
        <div className="cart-header">
            <FormControlLabel
                control={
                    <Switch
                        onChange={() => {
                            setShowDescription(!showDescription);
                        }}
                    />
                }
                label="Display descriptions"
            />
            <button className="delete-all" onClick={emptyCart}>
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
                            description={showDescription}
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
                    <CartSummary
                        sum={sumTotal}
                        emptyCart={emptyCart}
                        setItemsPurchased={setItemsPurchased}
                        items={items}
                        shippingPrice={shippingPrice}
                        shippingLimit={shippingLimit}
                    />
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

const CartItemLine = ({ item, changeAmount, deleteProduct, description }) => {
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
                <Link to={`/items/${item.item.id}`} className="item-name">
                    {item.item.title}
                </Link>
                {description && (
                    <div className="description">{item.item.description}</div>
                )}
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

const CartSummary = ({
    sum,
    emptyCart,
    setItemsPurchased,
    items,
    shippingPrice,
    shippingLimit,
}) => {
    const remaining = (shippingLimit - sum).toFixed(2);
    const freeShipping = sum >= shippingLimit;

    const barStyle = {
        width: `${freeShipping ? 100 : (sum / shippingLimit) * 100}%`,
    };

    const handelCheckout = () => {
        setItemsPurchased({ items, shipping: shippingPrice });
        emptyCart();
    };

    return (
        <div className="summary">
            <div className="prices">
                {shippingPrice !== 0 ? (
                    <>
                        <div className="total-price products">
                            <span>Products:</span>
                            <span className="amount">${sum.toFixed(2)}</span>
                        </div>
                        <div className="total-price shipping">
                            <span>Shipping:</span>
                            <span className="amount">${shippingPrice}</span>
                        </div>
                    </>
                ) : ""}
                <div className="total-price sum">
                    <span>Total:</span>
                    <span className="amount">
                        ${(sum + shippingPrice).toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="free-shipping-progress">
                <div className="text">
                    {freeShipping
                        ? "Order qualifies for free shipping"
                        : `$${remaining} left for free shipping`}
                </div>
                <div className="bar-wrapper">
                    <div className="bar" style={barStyle}></div>
                    <div className="bar-text">
                        {freeShipping ? "🎉" : `$${sum} / $${shippingLimit}`}
                    </div>
                </div>
            </div>
            <div className="checkout">
                <Link to="./checkout" onClick={handelCheckout}>
                    <button>Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
