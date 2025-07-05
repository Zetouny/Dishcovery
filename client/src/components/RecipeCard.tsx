import { Card, CardFooter, CardHeader, Chip, Image, Link } from '@heroui/react';
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
      className="w-full max-h-[350px]"
      onPress={() => {
        navigate(`/recipe/${item?.idMeal}`);
      }}
    >
      {random && (
        <CardHeader className="absolute z-10 top-1 flex-row gap-2 justify-end">
          <Link href={`browse/cuisine/${item?.strArea}`}>
            <Chip
              classNames={{
                base: 'hover:bg-primary transition dark:text-white'
              }}
              color="secondary"
              radius="sm"
              size="sm"
            >
              {item?.strArea}
            </Chip>
          </Link>
          <Link href={`browse/category/${item?.strCategory}`}>
            <Chip
              classNames={{
                base: 'hover:bg-primary transition dark:text-white'
              }}
              color="secondary"
              radius="sm"
              size="sm"
            >
              {item?.strCategory}
            </Chip>
          </Link>
        </CardHeader>
      )}
      <Image
        removeWrapper
        alt={item?.strMeal}
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={`${item?.strMealThumb}`}
      />
      {random ? (
        <CardFooter className="absolute bg-white/50 dark:bg-black/50 bottom-0 border-t-1 border-zinc-100/50 dark:border-zinc-600/50 z-10 justify-between">
          <div>
            <p className="text-sm text-left">
              Discover a random recipe every time!
            </p>
            <h4 className="font-medium text-left text-xl">{item?.strMeal}</h4>
          </div>
        </CardFooter>
      ) : (
        <CardFooter className="absolute bg-white/50 dark:bg-black/50 bottom-0 border-t-1 border-zinc-100/50 dark:border-zinc-600/50 z-10 justify-center">
          <h4 className="font-medium m-1 truncate">{item?.strMeal}</h4>
        </CardFooter>
      )}
    </Card>
  );
}
