import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./Items.scss";
import AmountPicker from "./AmountPicker";
import useHeadingUpdate from "./useHeadingUpdate";

const Items = ({
    addToCart,
    setPage,
    shopUrl,
    allCategories,
    CATEGORIESTEMPLATE,
}) => {
    const urlParams = useParams();

    const ITEMSTODISPLAYINITIALLY = 6;

    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(ITEMSTODISPLAYINITIALLY);
    const [currentCategory, setCurrentCategory] = useState(CATEGORIESTEMPLATE);
    const [displayLoadButton, setDisplayLoadButton] = useState(true);
    const [shouldFetchItems, setShouldFetchItems] = useState(false);

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

    // Set current page header
    useHeadingUpdate(currentCategory.name, setPage);

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

            setItems(products);
            console.log(currentCategory);
            console.log("products fetched");
        };
        if (shouldFetchItems) {
            getItems();
        }
    }, [
        amount,
        currentCategory,
        shouldFetchItems,
        CATEGORIESTEMPLATE.name,
        shopUrl,
    ]);

    // Show/hide "load more.."
    useEffect(() => {
        if (items.length < amount) {
            setDisplayLoadButton(false);
        } else {
            setDisplayLoadButton(true);
        }
    }, [items, amount]);

    // Reset amount when category changes
    useEffect(() => {
        setAmount(ITEMSTODISPLAYINITIALLY);
    }, [currentCategory]);

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
        return <ItemCard key={item.id} item={item} addToCart={addToCart} />;
    });

    return (
        <div className="all-products">
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
            <button onClick={loadMore}>Load more..</button>
        </div>
    );
};

// ITEM CARD
const ItemCard = ({ item, addToCart }) => {
    return (
        <div className="product-card">
            <Link to={`/items/${item.id}`}>
                <div className="image">
                    <img src={item.image} alt={item.title} />
                </div>
                <div className="title">{item.title}</div>
            </Link>
            <div className="divider"></div>
            <div className="product-card-actions">
                <div className="price">{item.price.toFixed(2)}</div>
                <AddToCartModule item={item} addToCartFunc={addToCart} />
            </div>
        </div>
    );
};

// ADD TO CART
const AddToCartModule = ({ item, addToCartFunc }) => {
    const [amount, setAmount] = useState(1);

    const addToCart = () => {
        addToCartFunc(item, amount);
        setAmount(1);
    };

    return (
        <div className="add-to-cart">
            <AmountPicker onChange={setAmount} amount={amount} />
            <div className="add-to-cart-button">
                <button onClick={addToCart}>Add to cart</button>
            </div>
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
