import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModalImage from "react-modal-image";
import Rating from "@mui/material/Rating";
import urlSlug from "url-slug";

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
            <ProductDescription item={item} />
        </div>
    );
};

export default Item;

const ProductView = ({ item, addAction }) => {
    return (
        <div className="main-info">
            <h1 className="title">{item.title}</h1>
            <div className="category">
                See all{" "}
                <Link to={"/items/category/" + urlSlug(item.category)}>
                    {item.category}
                </Link>
            </div>
            <div className="image">
                <ModalImage
                    small={item.image}
                    large={item.image}
                    alt={item.title}
                    hideDownload
                    hideZoom
                />
            </div>
            <ProductRating item={item} />
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
                Add to cart
            </button>
        </div>
    );
};

const ProductDescription = ({ item }) => {
    return (
        <div className="description">
            <h3>Product description</h3>
            <p>{item.description}</p>
        </div>
    );
};

const ProductRating = ({ item }) => {
    const [rating, setRating] = useState(null);

    useEffect(() => {
        setRating(item.rating?.rate);
    }, [item.rating?.rate]);

    const votes = item.rating?.count;

    return (
        <div className="rating">
            <Rating readOnly precision={0.1} value={rating} />
            <span>{rating}</span> <span className="votes">{votes} votes</span>
        </div>
    );
};
