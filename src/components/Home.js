import useHeadingUpdate from "./useHeadingUpdate";
import "./Home.scss";

const Home = ({ setPage }) => {
    useHeadingUpdate("home", setPage);
    return <div className="home">Hei home page</div>;
};

export default Home;
