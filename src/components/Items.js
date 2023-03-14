import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./Items.css";
import urlSlug from "url-slug";

const Items = () => {
    const shopUrl = "https://fakestoreapi.com/products";
    const urlParams = useParams();

    const CATEGORIESTEMPLATE = {
        name: "all items",
        slug: urlSlug("all items"),
    };

    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(6);
    const [currentCategory, setCurrentCategory] = useState(CATEGORIESTEMPLATE);
    const [allCategories, setAllCategories] = useState([CATEGORIESTEMPLATE]);
    const [displayLoadButton, setDisplayLoadButton] = useState(true);
    const [shouldFetchItems, setShouldFetchItems] = useState(false);

    // On mount, fetch categories
    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(shopUrl + "/categories").then((res) =>
                res.json()
            );
            const categories = response.map((cat) => {
                return {
                    name: cat,
                    slug: urlSlug(cat),
                };
            });
            setAllCategories([CATEGORIESTEMPLATE, ...categories]);
        };
        getCategories();
    }, []);

    // Get current category from URL
    useEffect(() => {
        const setCategoryFromUrl = () => {
            const slug = urlParams.category;
            let category;
            for (let cat of allCategories) {
                if (cat.slug === slug) {
                    category = cat;
                }
            }
            if (category) {
                setCurrentCategory(category);
                setShouldFetchItems(true);
            }
        };
        setCategoryFromUrl();
    }, [allCategories, urlParams.category]);

    // Fetch items
    useEffect(() => {
        // fetch every time, or get all item once?
        const getItems = async () => {
            const categoryQuery =
                currentCategory.name === CATEGORIESTEMPLATE.name
                    ? ""
                    : "/category/" + currentCategory.name;
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
            console.log(currentCategory);
            console.log("products fetched");
        };
        if (shouldFetchItems) {
            getItems();
        }
    }, [amount, currentCategory, shouldFetchItems, CATEGORIESTEMPLATE.name]);

    const loadMore = () => {
        setAmount((prevAmount) => prevAmount + 3);
        setTimeout(() => {
            const newItems = document.querySelector(
                ".product-card:nth-last-child(6)"
            );
            newItems.scrollIntoView();
        }, 250);
    };

    const products = items.map((item) => {
        return <ItemCard key={item.id} item={item} />;
    });

    return (
        <div className="product-page">
            <ItemMenu onClick={setCurrentCategory} categories={allCategories} />
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
const ItemMenu = ({ onClick, categories }) => {
    return (
        <div className="item-menu">
            {categories.map((cat, n) => {
                return (
                    <NavLink
                        key={n}
                        to={"/items/category/" + cat.slug}
                        className="category"
                        onClick={() => {
                            onClick(cat);
                        }}
                    >
                        <li>{cat.name}</li>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Items;
