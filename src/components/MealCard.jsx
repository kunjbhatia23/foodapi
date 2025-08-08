import React from 'react';
import './MealCard.css';

const MealCard = ({ meal, onAddFavorite }) => {
  return (
    <div className="meal-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
      <div className="meal-details">
        <h3>{meal.strMeal}</h3>
        <p>{meal.strCategory}</p>
        <button onClick={() => onAddFavorite(meal)}>Add to Favorites</button>
      </div>
    </div>
  );
};

export default MealCard;