import React, { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import FavoritesList from './components/FavoritesList';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // This function runs only once on initial render
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (e) {
      console.error("Failed to load favorites from local storage:", e);
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch meals from the API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (e) {
        setError("Could not fetch meals. Please try again later.");
        console.error("Error fetching meals:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  // Effect to save favorites to local storage whenever the favorites state changes
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to local storage:", e);
    }
  }, [favorites]); // The dependency array ensures this runs on every 'favorites' state change

  const handleAddFavorite = (meal) => {
    // Prevent adding duplicates
    if (!favorites.some(fav => fav.idMeal === meal.idMeal)) {
      setFavorites(prevFavorites => [...prevFavorites, meal]);
    }
  };

  if (loading) return <div className="loading-state">Loading meals...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Meal Browser</h1>
      </header>
      <div className="content-wrapper">
        <section className="meals-section">
          <h2>Meals Starting with 'A'</h2>
          <div className="meals-grid">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} onAddFavorite={handleAddFavorite} />
            ))}
          </div>
        </section>
        <aside className="favorites-section">
          <FavoritesList favorites={favorites} />
        </aside>
      </div>
    </div>
  );
}

export default App;