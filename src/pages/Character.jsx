import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gif from "../assets/img/charat.gif";

const CharacterComics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchCharacterComics = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--ynyvw48hxvj2.code.run/comics/${characterId}`
        );
        setComics(response.data.comics);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCharacterComics();
  }, [characterId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="character-container">
      <div className="gif-container">
        <img src={gif} alt="charat-gif" />
      </div>
      <Slider {...sliderSettings}>
        {comics.map((comic) => (
          <div key={comic._id} className="comic-slide">
            <h3>{comic.title}</h3>
            {comic.thumbnail && (
              <img
                className="comic-image"
                src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CharacterComics;
