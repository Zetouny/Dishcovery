import { useParams } from 'react-router-dom';

import DefaultLayout from '@/layouts/default';
import useFetch from '@/hooks/useFetch';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import GradientText from '@/components/GradientText';

export default function BrowsePage() {
  const { type, value } = useParams();

  function typeURL() {
    switch (type) {
      case 'cuisine':
        return `https://themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      case 'category':
        return `https://themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      case 'ingredient':
        return `https://themealdb.com/api/json/v1/1/filter.php?i=${value}`;
      default:
        throw new Error('Invalid link');
    }
  }

  const { data } = useFetch<Recipe>(typeURL());
  const recipes = data?.meals ?? null;

  return (
    <DefaultLayout>
      <h1 className="text-5xl text-center mb-6">
        Recipes by{' '}
        <span className="capitalize">
          <GradientText>{value}</GradientText> {type}
        </span>
      </h1>
      <section className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes?.map((item) => (
          <RecipeCard key={item.idMeal} item={item} random={false} />
        ))}
      </section>
    </DefaultLayout>
  );
}
