import { useEffect, useState } from "react";
import { Link, NavLink, Route } from "react-router-dom";
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
            <ItemMenu />

            <div className="items">{products}</div>
            {amount < 20 && <LoadMoreButton loadMore={loadMore} />}
        </div>
    );
};

// BUTTON TO LOAD MORE ITEMS
const LoadMoreButton = ({ loadMore }) => {
    return (
        <div className="load-more">
            <button className="button" onClick={loadMore}>
                Load more..
            </button>
        </div>
    );
};

// ITEM CARD
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

// ITEM MENU
const ItemMenu = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(
                "https://fakestoreapi.com/products/categories"
            ).then((res) => res.json());
            setCategories(response);
        };
        getCategories();
    }, []);
    return (
        <div className="item-menu">
            {categories.map((cat, n) => {
                return (
                    <NavLink key={n} to={cat} className="category">
                        <li>{cat}</li>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Items;
