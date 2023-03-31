import useHeadingUpdate from "./useHeadingUpdate";
import "./Checkout.scss";

const Checkout = ({ items, setPage, sumTotal }) => {
    useHeadingUpdate("checkout", setPage);

    const sum = items
            .reduce((a, b) => {
                return a + b.amount * b.item.price;
            }, 0)
            .toFixed(2);

    return (
        <div className="summary">
            <h2>Thank you for your purchase!</h2>
            <div className="items">
                {items.map((item) => {
                    return (
                        <div className="item-line">
                            <div className="item">
                                {item.amount} x {item.item.title}
                            </div>
                            <div className="item-price">
                                {item.amount * item.item.price}
                            </div>
                        </div>
                    );
                })}
                <div className="shipping item-line">
                    <span>Shipping</span>
                    <span className="item-price">0</span>
                </div>
                <div className="sum-total item-line">
                    <span>Sum total</span>
                    <span className="item-price">{sum}</span>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
