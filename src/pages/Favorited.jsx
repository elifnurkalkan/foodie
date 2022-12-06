import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';
import styles from './Favorited.css';
import { useAppContext } from '../components/context/appContext';
import Footer from '../components/Footer';

function Favorited() {
  const { favoriteRecipes, addToFavorites, removeFromFavorites } =
    useAppContext();

  const favoritesChecker = (id) => {
    const boolean = favoriteRecipes?.some((recipe) => recipe?.id === id);
    return boolean;
  };

  return (
    <div>
      <div className="wrapper">
        <h3>Favorites</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: true,
            pagination: false,
            drag: 'free',
            gap: '5rem',
            breakpoints: {
              950: {
                perPage: 2,
              },
              600: {
                perPage: 1,
              },
            },
          }}
        >
          {favoriteRecipes?.map((recipe) => {
            return (
              <SplideSlide key={recipe?.id}>
                <div className="card" id={styles['gradient']}>
                  <Link to={'/recipe/' + recipe?.id}>
                    <p>{recipe?.title}</p>
                    <img src={recipe?.image} alt={recipe?.title} />
                  </Link>

                  <div className="favBtn">
                    {favoritesChecker(recipe?.id) ? (
                      <p>
                        <button onClick={() => removeFromFavorites(recipe?.id)}>
                          Remove from Favorites
                        </button>
                      </p>
                    ) : (
                      <p>
                        <button onClick={() => addToFavorites(recipe)}>
                          Add to Favorites
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      <Footer />
    </div>
  );
}

export default Favorited;
