import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Items.css";
import urlSlug from "url-slug";

const Items = () => {
    const shopUrl = "https://fakestoreapi.com/products";

    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(6);
    const [category, setCategory] = useState("all items");
    const [displayLoadButton, setDisplayLoadButton] = useState(true);

    useEffect(() => {
        const getItems = async () => {
            const categoryQuery =
                category === "all items" ? "" : "/category/" + category;
            let limitQuery = "";
            if (amount) {
                limitQuery = `?limit=${amount}`;
            }
            const products = await fetch(
                shopUrl + categoryQuery + limitQuery
            ).then((result) => result.json());
            if (products.length < amount) {
                setDisplayLoadButton(false);
            } else {
                setDisplayLoadButton(true);
            }
            setItems(products);
        };
        getItems();
    }, [amount, category]);

    const loadMore = () => {
        setAmount((prevAmount) => prevAmount + 3);
        setTimeout(() => {
            const newItems = document.querySelector(".product-card:nth-last-child(6)");
            newItems.scrollIntoView();
        }, 250);
    };

    const products = items.map((item) => {
        return <ItemCard key={item.id} item={item} />;
    });

    return (
        <div className="product-page">
            <ItemMenu onClick={setCategory} />
            <div className="items">{products}</div>
            {displayLoadButton && <LoadMoreButton loadMore={loadMore} />}
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
const ItemMenu = ({ onClick }) => {
    const [categories, setCategory] = useState(["all items"]);
    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(
                "https://fakestoreapi.com/products/categories"
            ).then((res) => res.json());
            setCategory(["all items", ...response]);
        };
        getCategories();
    }, []);
    return (
        <div className="item-menu">
            {categories.map((cat, n) => {
                return (
                    <NavLink
                        key={n}
                        to={"/items/category/" + urlSlug(cat)}
                        className="category"
                        onClick={() => {
                            onClick(cat);
                        }}
                    >
                        <li>{cat}</li>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Items;
