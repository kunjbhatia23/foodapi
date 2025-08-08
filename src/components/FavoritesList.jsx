import React from 'react';
import './FavoritesList.css';

const FavoritesList = ({ favorites }) => {
  return (
    <div className="favorites-list-container">
      <h2>Your Favorite Meals</h2>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet!</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((meal) => (
            <div key={meal.idMeal} className="favorite-item">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="favorite-image" />
              <p>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;