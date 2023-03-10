import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Item = () => {
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

    return <div>{item.title}</div>;
};

export default Item;
