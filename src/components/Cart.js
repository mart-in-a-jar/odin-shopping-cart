import { useCallback } from "react";
import { Link } from "react-router-dom";
import AmountPicker from "./AmountPicker";
import "./Cart.scss";

const Cart = ({ items, changeAmount, deleteProduct }) => {

    const itemlines =
        items.length > 0
            ? items.map((item) => {
                  return (
                      <CartItemLine
                          key={item.item.id}
                          item={item}
                          changeAmount={changeAmount}
                          deleteProduct={deleteProduct}
                      />
                  );
              })
            : <div className="no-items">Your cart is empty.</div>;

    return (
        <ul className="cart-items">
            <CartItemsHeader />
            {itemlines}
        </ul>
    );
};

const CartItemsHeader = () => {
    return (
        <div className="cart-items-header">
            <div></div>
            <div></div>
            <div className="amount-heading">Amount</div>
            <div className="price-heading">Price</div>
            <div className="total-price-heading">Total</div>
            <div className="delete-heading">Delete</div>
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
            <div className="amount">
                <AmountPicker
                    amount={item.amount}
                    onChange={handleChangeAmount}
                />
            </div>
            <div className="price">{item.item.price}</div>
            <div className="total price">{(item.amount * item.item.price).toFixed(2)}</div>
            <button className="delete" onClick={handleDelete}>
                X
            </button>
        </li>
    );
};

export default Cart;
