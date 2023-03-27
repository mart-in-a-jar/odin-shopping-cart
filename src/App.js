import { BrowserRouter, Routes, Route } from "react-router-dom";

//Own components
import Header from "./components/Header";
import Cart from "./components/Cart";
import Item from "./components/Item";
import Items from "./components/Items";
import { useEffect, useState } from "react";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
    const [currentPage, setCurrentPage] = useState("Home");

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
        const sum = cartItems
            .reduce((a, b) => {
                return a + b.amount * b.item.price;
            }, 0)
            .toFixed(2);
        setCartTotal(sum);
    }, [cartItems]);

    return (
        <div className="main">
            <BrowserRouter>
                <Header cartAmount={numberOfItemsInCart} page={currentPage} />
                <Routes>
                    <Route path="/" element={<div>Hei home page</div>} />
                    <Route
                        path="/items/category/:category"
                        element={
                            <Items
                                addToCart={addToCart}
                                setPage={setCurrentPage}
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
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
