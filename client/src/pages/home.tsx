import { useState } from 'react';
import {
  Card,
  CardFooter,
  Image,
  Button,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Divider
} from '@heroui/react';
import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@/layouts/default';
import useFetch from '@/hooks/useFetch';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';
import { SearchIcon } from '@/components/icons';

type Categories = {
  categories: {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
  }[];
};

export default function HomePage() {
  const [recipeSearch, setRecipeSearch] = useState<string>('');
  const navigate = useNavigate();

  const { data, loading } = useFetch<Recipe>(
    `https://themealdb.com/api/json/v1/1/search.php?s=${recipeSearch}`
  );

  const getRandomRecipe = useFetch<Recipe>(
    `https://themealdb.com/api/json/v1/1/random.php`
  );
  const randomRecipe = getRandomRecipe.data?.meals?.[0] ?? null;

  const getRecipeCategories = useFetch<Categories>(
    `https://themealdb.com/api/json/v1/1/categories.php`
  );
  const recipeCategories = getRecipeCategories.data?.categories ?? null;

  const getRecipeCuisine = useFetch<{ meals: { strArea: string }[] }>(
    `https://themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const recipeCuisine = getRecipeCuisine.data?.meals ?? null;

  return (
    <DefaultLayout>
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left basis-full">
          <h1 className="text-5xl">
            Welcome to <span className="font-bold">Dishcovery</span>
          </h1>
          <p className="text-2xl mt-2">Bringing the World to Your Table.</p>
          <p className="mt-7">
            Discover, save, and share incredible recipes with a vibrant
            food-loving community. Whether you’re an adventurous home chef or
            just looking for dinner inspiration, Dishcovery helps you explore
            new flavors, organize your favorites. Start your culinary journey
            today!
          </p>
          <Autocomplete
            className="mt-5"
            color="primary"
            inputValue={recipeSearch}
            isLoading={loading}
            items={data?.meals ?? []}
            label="Search for a recipe"
            placeholder="Try 'spaghetti', 'salad', or 'brownies'..."
            size="lg"
            startContent={<SearchIcon className="mb-0.5" />}
            variant="faded"
            onInputChange={setRecipeSearch}
            onSelectionChange={(key) => navigate(`/recipe/${key}`)}
          >
            {(item) => (
              <AutocompleteItem
                key={item.idMeal}
                className="capitalize"
                textValue={item.strMeal}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={item.strMeal}
                      className="flex-shrink-0"
                      size="sm"
                      src={`${item.strMealThumb}/small`}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{item.strMeal}</span>
                      <span className="text-tiny text-default-400">
                        {item.strArea}
                      </span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <div className="w-full basis-full">
          {randomRecipe && (
            <RecipeCard
              key={randomRecipe.idMeal}
              item={randomRecipe}
              random={true}
            />
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl text-center md:text-left">
          Discover our recipes by category:
        </h2>
        <Divider className="my-4" />
        <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
          {recipeCategories?.map((item) => (
            <Card
              key={item.idCategory}
              isFooterBlurred
              isHoverable
              className="border-none p-5"
              isPressable={true}
              onPress={() => navigate(`/browse/category/${item.strCategory}`)}
            >
              <Image
                alt={item.strCategory}
                className="object-cover"
                radius="lg"
                src={item.strCategoryThumb}
                width="100%"
              />
              <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-small bottom-5 w-[calc(100%-2.5rem)] shadow-small p-1 z-10">
                <p className="text-medium font-bold">{item.strCategory}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl text-center md:text-left">
          Discover our recipes by cuisine:
        </h2>
        <Divider className="my-4" />
        <div className="gap-2 grid grid-cols-3 md:grid-cols-6">
          {recipeCuisine?.map((item) => (
            <Button
              key={item.strArea}
              variant="ghost"
              onPress={() => navigate(`./browse/cuisine/${item.strArea}`)}
            >
              {item.strArea}
            </Button>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
