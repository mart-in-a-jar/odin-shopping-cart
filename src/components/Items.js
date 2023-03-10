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
        return (
            <div key={item.id}>
                <Link to={`/items/${item.id}`}>{item.title}</Link>
                <br />
            </div>
        );
    });

    return (
        <div className="items">
            {products}
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

const ItemCard = () => {
    return <div>Hei</div>;
};

export default Items;
