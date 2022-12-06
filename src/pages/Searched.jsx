import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../components/context/appContext';
import Footer from '../components/Footer';

import './Searched.css';

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();
  const { favoriteRecipes, addToFavorites, removeFromFavorites } =
    useAppContext();

  const favoritesChecker = (id) => {
    const boolean = favoriteRecipes?.some((recipe) => recipe?.id === id);
    return boolean;
  };

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`,
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <div className="grid">
      {searchedRecipes?.map((item) => {
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
      <Footer />
    </div>
  );
}

export default Searched;
