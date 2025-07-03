import { Card, CardFooter, CardHeader, Chip, Image } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

interface RecipeItem {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strMealThumb: string;
}

interface RecipeCardProps {
  item: RecipeItem;
  random: boolean;
}

export default function RecipeCard({ item, random }: RecipeCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      isFooterBlurred
      isPressable
      className="w-full h-[300px]"
      onPress={() => {
        navigate(`/recipe/${item?.idMeal}`);
      }}
    >
      {random && (
        <CardHeader className="absolute z-10 top-1 flex-row gap-2 items-start">
          <Chip color="secondary" radius="sm" size="sm" variant="shadow">
            {item?.strArea}
          </Chip>
          <Chip color="secondary" radius="sm" size="sm" variant="shadow">
            {item?.strCategory}
          </Chip>
        </CardHeader>
      )}
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={`${item?.strMealThumb}/large`}
      />
      {random ? (
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-sm m-2">Discover a random recipe every time!</p>
            <h4 className="font-medium text-left text-xl m-2">
              {item?.strMeal}
            </h4>
          </div>
          <Chip color="primary" radius="sm" size="sm" variant="shadow">
            Discover Recipe
          </Chip>
        </CardFooter>
      ) : (
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-center">
          <h4 className="font-medium m-1 truncate">{item?.strMeal}</h4>
        </CardFooter>
      )}
    </Card>
  );
}
