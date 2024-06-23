import { Link } from "react-router-dom";
import thor from "../assets/img/thorgif.gif";
import enter from "../assets/img/enter2.gif";

const Home = () => {
  return (
    <section className="f">
      <div className="home-container">
        <img src={thor} alt="thor-gif" className="thor-gif" />
        <Link to="/characters">
          {" "}
          <img className="enter" src={enter} alt="" />
        </Link>
      </div>
    </section>
  );
};

export default Home;
