import { useParams } from 'react-router-dom';
import { useContext } from 'react';

import useFetch from '@/hooks/useFetch';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import GradientText from '@/components/GradientText';
import { UserContext } from '@/context/UserContext';
import PageNotFound from '@/components/PageNotFound';

export default function BrowsePage() {
  const { type, value } = useParams();
  const { favorites } = useContext(UserContext);

  function typeURL() {
    switch (type) {
      case 'cuisine':
        return `https://themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      case 'category':
        return `https://themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      case 'ingredient':
        return `https://themealdb.com/api/json/v1/1/filter.php?i=${value}`;
      default:
        return 'invalid';
    }
  }

  const { data } = useFetch<Recipe | null>(typeURL());
  const recipes = data?.meals ?? [];

  if (typeURL() === 'invalid' || data?.meals === null) {
    return <PageNotFound />;
  }

  return (
    <>
      <h1 className="text-5xl text-center mb-6">
        <span>Recipes {type === 'ingredient' ? 'with' : 'in'} </span>
        <span className="capitalize">
          <GradientText>{value}</GradientText> {type}
        </span>
      </h1>
      <section className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((item: Recipe['meals'][number]) => (
          <RecipeCard
            key={item.idMeal}
            isFavorite={favorites?.includes(item.idMeal)}
            item={item}
            random={false}
          />
        ))}
      </section>
    </>
  );
}
