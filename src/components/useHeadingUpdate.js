import { useEffect } from "react";
const useHeadingUpdate = (title, func) => {
    useEffect(() => {
        func(title);
    }, [title]);
};

export default useHeadingUpdate;
