import { Link } from "react-router-dom";
import useHeadingUpdate from "./useHeadingUpdate";
import "./Home.scss";
import img_allItems from "../img/all_items.jpg";
import img_electronics from "../img/electronics.jpg";
import img_jewelery from "../img/jewelery.jpg";
import img_mens_clothing from "../img/mens_clothing.jpg";
import img_womens_clothing from "../img/womens_clothing.jpg";

const images = [
    { category: "all items", image: img_allItems },
    { category: "electronics", image: img_electronics },
    { category: "jewelery", image: img_jewelery },
    { category: "men's clothing", image: img_mens_clothing },
    { category: "women's clothing", image: img_womens_clothing },
];

const Home = ({ setPage, categories }) => {
    useHeadingUpdate("home", setPage);

    return (
        <div className="home">
            <h1 className="title">SHOP</h1>
            <div className="categories">
                {categories.map((cat, n) => {
                    let image;
                    for (let img of images) {
                        if (
                            img.category.toLowerCase() ===
                            cat.name.toLowerCase()
                        ) {
                            image = img.image;
                        }
                    }
                    return (
                        <Link to={"/items/category/" + cat.slug} className="category" key={n}>
                            <h2>{cat.name}</h2>
                            <img src={image} alt={cat.name} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
