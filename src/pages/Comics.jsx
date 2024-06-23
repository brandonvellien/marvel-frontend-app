import React, { useState, useEffect } from "react";
import axios from "axios";
import storm from "../assets/img/storm.jpg";

const Comics = ({ search }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const limit = 100;
      const skip = (page - 1) * limit;
      try {
        const response = await axios.get(
          `https://site--marvel-backend--ynyvw48hxvj2.code.run/comics?title=${search}&limit=${limit}&skip=${skip}`
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
        <img src={storm} alt="Comic Header" className="header-image" />
      </div>
      <div className="comics-container">
        {data.results.map((comic) => (
          <div key={comic._id} className="comic-card">
            <img
              src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <div className="comic-card-content">
              <h2>{comic.title}</h2>
              <p>{comic.description}</p>
            </div>
          </div>
        ))}
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </main>
  );
};

export default Comics;
