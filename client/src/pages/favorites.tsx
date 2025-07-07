import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '@/context/UserContext';
import GradientText from '@/components/GradientText';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';

export default function FavoritesPage() {
  const { user, isUserLoading, favorites } = useContext(UserContext);
  const [favoritesList, setFavoritesList] = useState<Recipe[]>([]);

  useEffect(() => {
    if (favorites) {
      fetchRecipes();
    } else {
      setFavoritesList([]);
    }
  }, [favorites]);

  if (!user && !isUserLoading) {
    return <Navigate replace to="/" />;
  }

  async function fetchRecipes() {
    try {
      const fetchData = favorites.map(async (item) => {
        const response = await fetch(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${item}`
        );

        if (!response.ok) {
          throw new Error('Unexpected error, try again later');
        }

        return response.json();
      });

      const data = await Promise.all(fetchData);

      setFavoritesList(data);
    } catch (error) {
      setFavoritesList([]);
    }
  }

  return (
    <>
      <h1 className="text-5xl text-center mb-6">
        <span>Favorite </span>
        <span className="capitalize">
          <GradientText>Recipes</GradientText>
        </span>
      </h1>
      <section className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoritesList?.map((item) => (
          <RecipeCard
            key={item.meals[0].idMeal}
            isFavorite={favorites.includes(item.meals[0].idMeal)}
            item={item.meals[0]}
            random={false}
          />
        ))}
      </section>
    </>
  );
}
