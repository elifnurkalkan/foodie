import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Category.css';
import TodaysRecipe from './TodaysRecipe';
import FavoriteRecipes from './FavoriteRecipes';

function Category() {
  return (
    <div className="list">
      <TodaysRecipe />
      <NavLink className="ctg" to={'/cuisine/Italian'}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink className="ctg" to={'/cuisine/American'}>
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink className="ctg" to={'/cuisine/Thai'}>
        <GiNoodles />
        <h4>Thai</h4>
      </NavLink>
      <NavLink className="ctg" to={'/cuisine/Japanese'}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </NavLink>
      <FavoriteRecipes />
    </div>
  );
}

export default Category;
