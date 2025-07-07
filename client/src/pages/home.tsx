import { useContext, useState } from 'react';
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

import useFetch from '@/hooks/useFetch';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';
import GradientText from '@/components/GradientText';
import { UserContext } from '@/context/UserContext';
import { Categories } from '@/types/categories';

export default function HomePage() {
  const [recipeSearch, setRecipeSearch] = useState<string>('');
  const { favorites } = useContext(UserContext);

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
    <>
      <section className="flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="flex flex-col justify-between text-center lg:text-left basis-3/5 gap-2 ">
          <h1 className="text-5xl">
            Welcome to <GradientText>Dishcovery</GradientText>
          </h1>
          <p className="text-2xl">Bringing the World to Your Table.</p>
          <p className="">
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
            variant="faded"
            onInputChange={setRecipeSearch}
            onSelectionChange={(key) => navigate(`/recipe/${key}`)}
          >
            {(item: Recipe['meals'][number]) => (
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
                      <span className="text-small text-primary">
                        {item.strMeal}
                      </span>
                      <span className="text-tiny text-default-700">
                        {item.strArea}, {item.strCategory}
                      </span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <div className="w-full basis-2/5">
          {randomRecipe && (
            <RecipeCard
              key={randomRecipe.idMeal}
              isFavorite={favorites?.includes(randomRecipe.idMeal)}
              item={randomRecipe}
              random={true}
            />
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl text-center lg:text-left text-primary">
          Discover our recipes by category:
        </h2>
        <Divider className="mt-3 mb-6" />
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-4">
          {recipeCategories?.map((item: Recipe['meals'][number]) => (
            <Card
              key={item.idCategory}
              isFooterBlurred
              isHoverable
              className="p-5"
              classNames={{
                base: 'data-[hover=true]:bg-primary/20 dark:data-[hover=true]:bg-primary/20 items-center'
              }}
              isPressable={true}
              onPress={() => navigate(`/browse/category/${item.strCategory}`)}
            >
              <Image
                alt={item.strCategory}
                radius="sm"
                src={item.strCategoryThumb}
              />
              <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-small bottom-5 w-[calc(100%-2.5rem)] shadow-small p-1 z-10">
                <p className="text-medium font-bold">{item.strCategory}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl text-center lg:text-left text-primary">
          Discover our recipes by cuisine:
        </h2>
        <Divider className="mt-3 mb-6" />
        <div className="gap-2 grid grid-cols-3 lg:grid-cols-6">
          {recipeCuisine?.map((item: Recipe['meals'][number]) => (
            <Button
              key={item.strArea}
              className="data-[hover=true]:bg-primary-500"
              variant="ghost"
              onPress={() => navigate(`./browse/cuisine/${item.strArea}`)}
            >
              {item.strArea}
            </Button>
          ))}
        </div>
      </section>
    </>
  );
}
