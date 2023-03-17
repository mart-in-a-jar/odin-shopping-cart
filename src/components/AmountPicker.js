import { useEffect, useState } from "react";
import "./AmountPicker.scss";

export default function AmountPicker({ onChange, amount }) {
    const [displayedAmount, setDisplayedAmount] = useState(amount);
    const [actualAmount, setActualAmount] = useState(amount);

    const handleInput = ({ target }) => {
        if (target.value > 0 && target.value < 100) {
            setDisplayedAmount(+target.value);
        } else if (target.value === "") {
            setDisplayedAmount("");
        }
    };
    const handleFocus = () => {
        setDisplayedAmount("");
    };
    const handleBlur = ({ target }) => {
        if (target.value === "") {
            setDisplayedAmount(actualAmount);
        }
    };
    useEffect(() => {
        if (displayedAmount > 0 && displayedAmount < 100) {
            setActualAmount(displayedAmount);
        }
    }, [displayedAmount]);

    // Update parent
    useEffect(() => {
        onChange(actualAmount);
    }, [actualAmount, onChange]);

    // Update from parent
    useEffect(() => {
        setDisplayedAmount(amount);
    }, [amount]);

    return (
        <div className="amount-picker">
            <button
                disabled={actualAmount <= 1}
                onClick={() => {
                    setDisplayedAmount((prevAmount) => {
                        return prevAmount - 1;
                    });
                }}
            >
                -
            </button>
            <input
                type="tel"
                value={displayedAmount}
                onChange={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <button
                disabled={actualAmount >= 99}
                onClick={() => {
                    setDisplayedAmount((prevAmount) => {
                        return prevAmount + 1;
                    });
                }}
            >
                +
            </button>
        </div>
    );
}
