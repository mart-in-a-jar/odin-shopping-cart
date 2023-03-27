import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHeadingUpdate from "./useHeadingUpdate";

const Item = ({ addToCart, setPage }) => {
    const { id } = useParams();
    const shopUrl = "https://fakestoreapi.com/products/" + id;
    const [item, setItem] = useState({});

    useEffect(() => {
        const getItem = async () => {
            const product = await fetch(shopUrl).then((result) =>
                result.json()
            );
            setItem(product);
        };
        getItem();
    }, [shopUrl]);

    useHeadingUpdate(item.title, setPage)

    return (
        <div>
            <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(item, null, 2)}
            </pre>
        </div>
    );
};

export default Item;
