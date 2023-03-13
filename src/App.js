import { BrowserRouter, Routes, Route } from "react-router-dom";

//Own components
import Header from "./components/Header";
import Cart from "./components/Cart";
import Item from "./components/Item";
import Items from "./components/Items";

function App() {
    return (
        <div className="main">
            <BrowserRouter>
                <Header cartAmount={10} />
                <Routes>
                    <Route path="/" element={<div>Hei home page</div>} />
                    <Route path="/items/category/:category" element={<Items />}/>
                    <Route path="/items/:id" element={<Item />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
