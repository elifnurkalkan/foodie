import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiHotMeal } from 'react-icons/gi';
import './TodaysRecipe.css';

function TodaysRecipe(recipe) {
  return (
    <NavLink className="today" to={'/todayRec'}>
      <GiHotMeal></GiHotMeal>
      <h4>Today's Recipe</h4>
    </NavLink>
  );
}

export default TodaysRecipe;
