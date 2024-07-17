import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/img/logo.png";

const Header = ({ search, setSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (location.pathname === "/comics") {
      navigate(`/comics`);
    } else {
      navigate(`/characters`);
    }
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <Link to={"/characters"}>
          <button>CHARACTERS</button>
        </Link>
        <Link to={"/comics"}>
          <button>COMICS</button>
        </Link>
      </div>
      <div className="header-logo-container">
        <Link to={"/"}>
          <img className="header-logo" src={logo} alt="marvel" />
        </Link>
      </div>
      <div className="header-right">
        <form onSubmit={handleSearch} className="header-form">
          <input
            type="text"
            placeholder="Rechercher"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="header-search-input"
          />
          <button type="submit" className="header-search-button">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
