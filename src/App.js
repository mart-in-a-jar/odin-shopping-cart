import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<div>Hei home page</div>} />
                <Route path="/items" element={<div>Hei items</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
