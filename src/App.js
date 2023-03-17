import { BrowserRouter, Routes, Route } from "react-router-dom";

//Own components
import Header from "./components/Header";
import Cart from "./components/Cart";
import Item from "./components/Item";
import Items from "./components/Items";
import { useEffect, useState } from "react";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

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

    const deleteFromCart = (item) => {
        setCartItems((prevCart) => {
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

    useEffect(() => {
        const amount = cartItems.reduce((a, b) => {
            return a + b.amount;
        }, 0);
        setNumberOfItemsInCart(amount);

        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="main">
            <BrowserRouter>
                <Header cartAmount={numberOfItemsInCart} />
                <Routes>
                    <Route path="/" element={<div>Hei home page</div>} />
                    <Route
                        path="/items/category/:category"
                        element={<Items addToCart={addToCart} />}
                    />
                    <Route
                        path="/items/:id"
                        element={<Item addToCart={addToCart} />}
                    />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                items={cartItems}
                                changeAmount={addToCart}
                                deleteProduct={deleteFromCart}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
