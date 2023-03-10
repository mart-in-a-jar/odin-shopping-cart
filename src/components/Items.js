import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";

const Items = () => {
    const shopUrl = "https://fakestoreapi.com/products";

    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(6);

    useEffect(() => {
        const getItems = async () => {
            let query = "";
            if (amount) {
                query = `?limit=${amount}`;
            }
            const products = await fetch(shopUrl + query).then((result) =>
                result.json()
            );
            setItems(products);
        };
        getItems();
    }, [amount]);

    const loadMore = () => {
        setAmount((prevAmount) => prevAmount + 3);
    };

    const products = items.map((item) => {
        return <ItemCard key={item.id} item={item} />;
    });

    return (
        <div className="product-page">
            <div className="items">{products}</div>
            {amount < 20 && <LoadMoreButton loadMore={loadMore} />}
        </div>
    );
};

const LoadMoreButton = ({ loadMore }) => {
    return (
        <div className="load-more">
            <button className="button" onClick={loadMore}>
                Load more..
            </button>
        </div>
    );
};

const ItemCard = ({ item }) => {
    return (
        <div className="product-card">
            <Link to={`/items/${item.id}`}>
                <div className="image">
                    <img src={item.image} alt={item.title} />
                </div>
                <div className="title">{item.title}</div>
            </Link>
            <div className="divider"></div>
            <div>add to cart</div>
        </div>
    );
};

export default Items;
