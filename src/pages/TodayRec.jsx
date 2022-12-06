import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from '../pages/TodayRec.css';
import { useAppContext } from '../components/context/appContext';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

function TodayRec() {
  const [today, setToday] = useState([]);
  const { favoriteRecipes, addToFavorites, removeFromFavorites } =
    useAppContext();

  const favoritesChecker = (id) => {
    const boolean = favoriteRecipes?.some((recipe) => recipe?.id === id);
    return boolean;
  };

  const getTodaysRecipe = async () => {
    const recipe = localStorage.getItem('today');

    if (recipe) {
      setToday(JSON.parse(recipe));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=1`,
      );
      const data = await api.json();
      localStorage.setItem('today', JSON.stringify(data.recipes));
      setToday(data.recipes);
      console.log(data.recipe);
    }
  };

  useEffect(() => {
    getTodaysRecipe();
  }, []);

  return (
    <div>
      <motion.div
        className="grid"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="wrapper">
          <h3>Today's Recipe</h3>
          {today?.map((recipe) => {
            return (
              <div className="card" key={recipe.id} id={styles['gradient']}>
                <Link to={'/recipe/' + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Link>
                <div className="favBtn">
                  {favoritesChecker(recipe.id) ? (
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
            );
          })}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default TodayRec;
