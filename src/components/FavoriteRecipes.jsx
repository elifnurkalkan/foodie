import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxHeartFilled } from 'react-icons/rx';
import './FavoriteRecipes.css';

function FavoriteRecipes() {
  return (
    <NavLink className="favorite" to={'/favoriteRecipes'}>
      <RxHeartFilled />
      <h4>Favorite Recipes</h4>
    </NavLink>
  );
}

export default FavoriteRecipes;
