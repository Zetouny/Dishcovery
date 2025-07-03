import { useParams } from 'react-router-dom';

import DefaultLayout from '@/layouts/default';
import useFetch from '@/hooks/useFetch';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';

export default function BrowsePage() {
  const { type, value } = useParams();

  const typeURL = () => {
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
  };

  const { data } = useFetch<Recipe>(typeURL());
  const recipes = data?.meals ?? null;

  return (
    <DefaultLayout>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="">
          Browsing by {type} / {value}
        </h1>
      </div>
      <section className="gap-6 grid grid-cols-2 md:grid-cols-4">
        {recipes?.map((item) => (
          <RecipeCard key={item.idMeal} item={item} />
        ))}
      </section>
    </DefaultLayout>
  );
}
