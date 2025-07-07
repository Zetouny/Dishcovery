import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, Chip, Divider, Image, Link } from '@heroui/react';

import useFetch from '@/hooks/useFetch';
import { Recipe } from '@/types/recipe';
import GradientText from '@/components/GradientText';
import PageNotFound from '@/components/PageNotFound';

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useFetch<Recipe>(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (data?.meals === 'Invalid ID') {
    return <PageNotFound />;
  }

  const recipe = data?.meals?.[0] ?? null;

  const ingredients: { name: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    if (recipe?.['strIngredient' + i]) {
      ingredients.push({
        name: recipe['strIngredient' + i],
        measure: recipe['strMeasure' + i]
      });
    }
  }

  const instructions = extractSteps(recipe?.strInstructions ?? '');

  // This function is made using AI to figure out how to convert instructions from one-paragraph into multiple steps
  function extractSteps(instructionText?: string): string[] {
    if (!instructionText) return [];

    const cleanText = instructionText
      .replace(/\r\n|\r/g, '\n') // Normalize line breaks
      .replace(/\u2013|\u2014/g, '-') // Normalize dashes
      .replace(/[ ]+/g, ' ') // Remove excess spaces
      .trim();

    // Match lines that start with step indicators like: "1.", "Step 1.", etc.
    const structuredSplit = cleanText
      .split(/(?:^|\n+)(?:Step\s*\d+\.?|(?<!\d)\d{1,2}\.\s)/g)
      .map((s) => s.trim())
      .filter(Boolean);

    // If it's clearly structured, return that
    if (structuredSplit.length > 1) {
      return structuredSplit;
    }

    // Fallback: sentence-based split
    const fallbackSplit = cleanText
      .split(/(?<=[.?!])\s+(?=[A-Z])/g) // split at sentence end + capital
      .map((s) => s.trim())
      .filter(Boolean);

    return fallbackSplit;
  }

  return (
    <>
      <section>
        <h1 className="text-5xl text-center">
          <GradientText className="font-heading font-bold text-5xl">
            {recipe?.strMeal}
          </GradientText>
        </h1>
        <div className="flex flex-row flex-wrap gap-2 justify-center">
          <Link href={`browse/cuisine/${recipe?.strArea}`}>
            <Chip
              classNames={{
                base: 'hover:bg-primary transition dark:text-white'
              }}
              radius="sm"
              size="md"
            >
              {recipe?.strArea}
            </Chip>
          </Link>
          <Link href={`browse/category/${recipe?.strCategory}`}>
            <Chip
              classNames={{
                base: 'hover:bg-primary transition dark:text-white'
              }}
              radius="sm"
              size="md"
            >
              {recipe?.strCategory}
            </Chip>
          </Link>
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-10 py-10">
        <div className="flex flex-col items-center md:items-start basis-2/5">
          <h2 className="hidden md:flex text-primary text-2xl text-center md:text-left">
            Recipe Image
          </h2>
          <Divider className="hidden md:block mt-3 mb-6" />
          <div className="max-w-[80%] md:max-w-[100%]">
            <Image alt={recipe?.strMeal} src={`${recipe?.strMealThumb}`} />
          </div>
        </div>

        <div className="basis-3/5">
          <h2 className="text-2xl text-center md:text-left text-primary">
            Ingredients
          </h2>
          <Divider className="mt-3 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ingredients.map((ingredient, index) => (
              <Card
                key={index}
                isHoverable
                isPressable
                radius="sm"
                onPress={() =>
                  navigate(`/browse/ingredient/${ingredient.name}`)
                }
              >
                <CardBody className="flex flex-row flex-nowrap gap-3">
                  <Image
                    alt={ingredient.name}
                    height={50}
                    src={`https://themealdb.com/images/ingredients/${ingredient.name.replaceAll(' ', '_')}.png`}
                    width={50}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{ingredient.name}</p>
                    <p className="text-small text-default-700">
                      {ingredient.measure}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <h2 className="text-2xl text-center md:text-left text-primary">
        Instructions
      </h2>
      <Divider className="mt-3 mb-6" />
      <section className="flex flex-col mt-5">
        {instructions.map((step, index) => (
          <Card key={index} radius="none" shadow="sm">
            <CardBody className="flex flex-row gap-2">
              <span className="text-primary font-bold">{index + 1}.</span>
              <span>{step}</span>
            </CardBody>
          </Card>
        ))}
      </section>
    </>
  );
}
