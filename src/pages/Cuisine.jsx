import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Cuisine.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../components/context/appContext';
import Footer from '../components/Footer';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const { favoriteRecipes, addToFavorites, removeFromFavorites } =
    useAppContext();

  const favoritesChecker = (id) => {
    const boolean = favoriteRecipes?.some((recipe) => recipe?.id === id);
    return boolean;
  };
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`,
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <div>
      <motion.div
        className="grid"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cuisine?.map((item) => {
          return (
            <div className="card" key={item.id}>
              <Link to={'/recipe/' + item.id}>
                <img src={item.image} alt="" />
                <p>
                  <h4>{item.title}</h4>
                </p>
              </Link>
              <div className="favBtn">
                {favoritesChecker(item.id) ? (
                  <p>
                    <button onClick={() => removeFromFavorites(item.id)}>
                      Remove from Favorites
                    </button>
                  </p>
                ) : (
                  <p>
                    <button onClick={() => addToFavorites(item)}>
                      Add to Favorites
                    </button>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
      <Footer />
    </div>
  );
}

export default Cuisine;
