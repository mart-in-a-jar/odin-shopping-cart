import useHeadingUpdate from "./useHeadingUpdate";

const Home = ({ setPage }) => {
    useHeadingUpdate("home", setPage);
    return <div className="home">Hei home page</div>;
};

export default Home;
