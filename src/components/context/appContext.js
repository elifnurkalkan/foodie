import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('Appcontext must be within appContextprovider');
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const addToFavorites = (recipe) => {
    const oldFavorites = [...favoriteRecipes];
    const newFavorites = oldFavorites.concat(recipe);
    setFavoriteRecipes(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const getFavorites = async (recipe) => {
    const check = localStorage.getItem('favoriteRecipes');

    if (check) {
      setFavoriteRecipes(JSON.parse(check));
    } else {
      const oldFavorites = [...favoriteRecipes];
      const newFavorites = oldFavorites.concat(recipe);
      setFavoriteRecipes(newFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const removeFromFavorites = (id) => {
    const oldFavorites = [...favoriteRecipes];
    const newFavorites = oldFavorites.filter((recipe) => recipe?.id !== id);
    setFavoriteRecipes(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    localStorage.getItem('favoriteRecipes');
  };

  return (
    <AppContext.Provider
      value={{
        favoriteRecipes,
        addToFavorites,
        removeFromFavorites,
        getFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
