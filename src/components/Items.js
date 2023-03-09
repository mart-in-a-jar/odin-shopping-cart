import { Link } from "react-router-dom";

const Items = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    return items.map((item) => {
        return (
            <div key={item}>
                <Link to={`/items/${item}`}>Item {item}</Link>
                <br />
            </div>
        );
    });
};

export default Items;
