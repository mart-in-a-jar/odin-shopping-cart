import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AmountPicker from "./AmountPicker";
import useHeadingUpdate from "./useHeadingUpdate";
import "./Item.scss";

const Item = ({ addToCart, setPage }) => {
    const { id } = useParams();
    const shopUrl = "https://fakestoreapi.com/products/" + id;
    const [item, setItem] = useState({});

    useEffect(() => {
        const getItem = async () => {
            const product = await fetch(shopUrl).then((result) =>
                result.json()
            );
            setItem(product);
        };
        getItem();
    }, [shopUrl]);

    useHeadingUpdate("product page", setPage);

    return (
        <div className="product-page">
            <ProductView item={item} addAction={addToCart} />
            <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(item, null, 2)}
            </pre>
        </div>
    );
};

export default Item;

const ProductView = ({ item, addAction }) => {
    return (
        <div className="main-info">
            <h1 className="title">{item.title}</h1>
            <div className="image">image</div>
            <CartActions item={item} addAction={addAction} />
        </div>
    );
};

const CartActions = ({ item, addAction }) => {
    const [amount, setAmount] = useState(1);

    const addToCart = () => {
        addAction(item, amount);
    };

    return (
        <div className="cart-actions">
            <div className="price">{item.price}</div>
            <AmountPicker onChange={setAmount} amount={amount} />
            <button className="button add-to-cart" onClick={addToCart}>
                add to cart
            </button>
        </div>
    );
};
