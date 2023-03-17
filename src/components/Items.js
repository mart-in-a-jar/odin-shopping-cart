import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./Items.scss";
import urlSlug from "url-slug";

const Items = () => {
    const shopUrl = "https://fakestoreapi.com/products";
    const urlParams = useParams();

    // Get this as a parameter?
    const CATEGORIESTEMPLATE = {
        name: "all items",
        slug: urlSlug("all items"),
    };

    const ITEMSTODISPLAYINITIALLY = 6;

    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(ITEMSTODISPLAYINITIALLY);
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

            setItems(products);
            console.log(currentCategory);
            console.log("products fetched");
        };
        if (shouldFetchItems) {
            getItems();
        }
    }, [amount, currentCategory, shouldFetchItems, CATEGORIESTEMPLATE.name]);

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
            <div className="product-card-actions">
                <div className="price">{item.price}</div>
                <AddToCartModule item={item} />
            </div>
        </div>
    );
};

const AddToCartModule = ({item}) => {
    const [displayedAmount, setDisplayedAmount] = useState(1);
    const [actualAmount, setActualAmount] = useState(1);

    const addToCart = () => {
        console.log(actualAmount + " * " + item.title)
    }

    const handleInput = ({ target }) => {
        if (target.value > 0 && target.value < 100) {
            setDisplayedAmount(+target.value);
        } else if (target.value === "") {
            setDisplayedAmount("");
        }
    };
    const handleFocus = () => {
        setDisplayedAmount("");
    };
    const handleBlur = ({ target }) => {
        if (target.value === "") {
            setDisplayedAmount(actualAmount);
        }
    };
    useEffect(() => {
        if (displayedAmount > 0 && displayedAmount < 100) {
            setActualAmount(displayedAmount);
        }
    }, [displayedAmount]);

    return (
        <div className="add-to-cart">
            <div className="amount-picker">
                <button
                    disabled={actualAmount <= 1}
                    onClick={() => {
                        setDisplayedAmount((prevAmount) => {
                            return prevAmount - 1;
                        });
                    }}
                >
                    -
                </button>
                <input
                    type="tel"
                    value={displayedAmount}
                    onChange={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <button
                    disabled={actualAmount >= 99}
                    onClick={() => {
                        setDisplayedAmount((prevAmount) => {
                            return prevAmount + 1;
                        });
                    }}
                >
                    +
                </button>
            </div>
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
