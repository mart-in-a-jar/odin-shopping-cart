import { Link } from "react-router-dom";
import AmountPicker from "./AmountPicker";
import "./Cart.scss";

const Cart = ({ items, changeAmount, deleteProduct }) => {
    const cartContent =
        items.length > 0 ? (
            <>
                <CartItemsHeader />
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
            </>
        ) : (
            <div className="no-items">Your cart is empty.</div>
        );

    return (
        <div className="cart-items">
            <ul className="item-lines">{cartContent}</ul>
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
            <div className="col total-price">
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

export default Cart;
