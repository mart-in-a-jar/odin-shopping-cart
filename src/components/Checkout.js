import useHeadingUpdate from "./useHeadingUpdate";
import "./Checkout.scss";

const Checkout = ({ cart, setPage, sumTotal }) => {
    useHeadingUpdate("checkout", setPage);
    const items = cart.items;
    const shipping = cart.shipping;
    const sum =
        items.reduce((a, b) => {
            return a + b.amount * b.item.price;
        }, 0) + shipping;
    return (
        <div className="checkout">
            <div className="summary">
                <h2>Thank you for your purchase!</h2>
                <div className="items">
                    {items.map((item) => {
                        return (
                            <div key={item.item.id} className="item-line prod">
                                <div className="item">
                                    {item.amount} x {item.item.title}
                                </div>
                                <div className="item-price">
                                    {item.amount * item.item.price}
                                </div>
                            </div>
                        );
                    })}
                    {shipping !== 0 ? (
                        <div className="shipping item-line sum">
                            <span>Shipping</span>
                            <span className="item-price">{shipping}</span>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="sum-total item-line sum">
                        <span>Sum total</span>
                        <span className="item-price">{sum.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
