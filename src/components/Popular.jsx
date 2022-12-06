import { useEffect, useState } from 'react';
import styles from './Popular.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';
import { useAppContext } from './context/appContext';

function Popular() {
  const [popular, setPopular] = useState([]);

  const { favoriteRecipes, addToFavorites, removeFromFavorites } =
    useAppContext();

  const favoritesChecker = (id) => {
    const boolean = favoriteRecipes?.some((recipe) => recipe?.id === id);
    return boolean;
  };

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem('popular');

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`,
      );
      const data = await api.json();
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
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
          {popular?.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className="card" id={styles['gradient']}>
                  <Link to={'/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                  </Link>

                  <div className="favBtn">
                    {favoritesChecker(recipe?.id) ? (
                      <p>
                        <button onClick={() => removeFromFavorites(recipe.id)}>
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
    </div>
  );
}

export default Popular;
