import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import venom from "../assets/img/venom.jpg";

const Characters = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const limit = 100;
      const skip = (page - 1) * limit;
      try {
        const response = await axios.get(
          `https://site--marvel-backend--ynyvw48hxvj2.code.run/characters?name=${search}&limit=${limit}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search, page]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="main-container">
      <div className="image-container">
        <img src={venom} alt="Storm" className="header-image" />
      </div>
      {data.results.map((character) => (
        <div className="card" key={character._id}>
          <img
            src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="card-content">
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <br />

            <Link className="more-info" to={`/comics/${character._id}`}>
              More Infos
            </Link>
          </div>
        </div>
      ))}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <div> </div>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </main>
  );
};

export default Characters;
