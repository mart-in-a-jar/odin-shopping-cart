import { BrowserRouter, Routes, Route } from "react-router-dom";
import urlSlug from "url-slug";
import { useEffect, useState } from "react";

//Own components
import Header from "./components/Header";
import Cart from "./components/Cart";
import Item from "./components/Item";
import Items from "./components/Items";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

function App() {
    const CATEGORIESTEMPLATE = {
        name: "all items",
        slug: urlSlug("all items"),
    };

    const shopUrl = "https://fakestoreapi.com/products";
    const limitForFreeShipping = 200;
    const shippingPrice = 10;
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
    const [currentPage, setCurrentPage] = useState("Home");
    const [itemsPurchased, setItemsPurchased] = useState([]);
    const [currentShippingPrice, setCurrentShippingPrice] =
        useState(shippingPrice);
    const [allCategories, setAllCategories] = useState([]);

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

    const addToCart = (item, amount) => {
        setCartItems((prevCart) => {
            let wasInCart = false;
            const newCart = prevCart.map((ele) => {
                if (ele.item.id === item.id) {
                    wasInCart = true;
                    return {
                        ...ele,
                        amount: ele.amount + amount,
                    };
                }
                return ele;
            });
            if (wasInCart) {
                return newCart;
            }
            return [...prevCart, { item: item, amount: amount }];
        });
    };

    const deleteFromCart = (item, all = false) => {
        setCartItems((prevCart) => {
            if (all) return [];
            return prevCart.filter((ele) => {
                return item.id !== ele.item.id;
            });
        });
    };

    // Get from localstorage
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cart"));
        if (storedItems) {
            setCartItems(storedItems);
        }
    }, []);

    // When cart items update
    useEffect(() => {
        // Update number of items in cart
        const amount = cartItems.reduce((a, b) => {
            return a + b.amount;
        }, 0);
        setNumberOfItemsInCart(amount);

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Update total sum
        const sum = cartItems.reduce((a, b) => {
            return a + b.amount * b.item.price;
        }, 0);
        setCartTotal(sum);
    }, [cartItems]);

    useEffect(() => {
        // Update shipping price
        if (cartTotal >= limitForFreeShipping) {
            setCurrentShippingPrice(0);
        } else setCurrentShippingPrice(shippingPrice);
    }, [cartTotal]);

    return (
        <div className="main">
            <BrowserRouter>
                <Header cartAmount={numberOfItemsInCart} page={currentPage} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                setPage={setCurrentPage}
                                categories={allCategories}
                            />
                        }
                    />
                    <Route
                        path="/items/category/:category"
                        element={
                            <Items
                                addToCart={addToCart}
                                setPage={setCurrentPage}
                                shopUrl={shopUrl}
                                allCategories={allCategories}
                                CATEGORIESTEMPLATE={CATEGORIESTEMPLATE}
                            />
                        }
                    />
                    <Route
                        path="/items/:id"
                        element={
                            <Item
                                addToCart={addToCart}
                                setPage={setCurrentPage}
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                items={cartItems}
                                changeAmount={addToCart}
                                deleteProduct={deleteFromCart}
                                sumTotal={cartTotal}
                                setPage={setCurrentPage}
                                setItemsPurchased={setItemsPurchased}
                                shippingPrice={currentShippingPrice}
                                shippingLimit={limitForFreeShipping}
                            />
                        }
                    />
                    <Route
                        path="/cart/checkout"
                        element={
                            <Checkout
                                cart={itemsPurchased}
                                setPage={setCurrentPage}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
