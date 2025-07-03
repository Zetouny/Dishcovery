import { useParams } from 'react-router-dom';
import { Card, CardBody, Chip, Divider, Image } from '@heroui/react';

import DefaultLayout from '@/layouts/default';
import useFetch from '@/hooks/useFetch';
import { Recipe } from '@/types/recipe';
import GradientText from '@/components/GradientText';

export default function RecipePage() {
  const { id } = useParams();

  const { data } = useFetch<Recipe>(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

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
    <DefaultLayout>
      <section className="flex flex-row items-center gap-10 pb-5">
        <div className="basis-1/2">
          <Image alt={recipe?.strMeal} src={`${recipe?.strMealThumb}/large`} />
        </div>
        <div className="flex flex-col gap-3 items-start basis-1/2">
          <div className="flex flex-row gap-2">
            <Chip>{recipe?.strArea}</Chip>
            <Chip>{recipe?.strCategory}</Chip>
          </div>

          <GradientText
            animationSpeed={3}
            className="text-5xl font-bold"
            colors={['#40ffaa', '#4079ff']}
            showBorder={false}
          >
            {recipe?.strMeal}
          </GradientText>

          <div className="grid grid-cols-3 gap-5 w-full">
            {ingredients.map((ingredient, index) => (
              <Card key={index} isPressable className="max-w-[400px]">
                <CardBody className="flex flex-row flex-nowrap gap-3">
                  <Image
                    alt={ingredient.name}
                    height={40}
                    radius="sm"
                    src={`https://themealdb.com/images/ingredients/${ingredient.name.replaceAll(' ', '_')}.png`}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{ingredient.name}</p>
                    <p className="text-small text-default-500">
                      {ingredient.measure}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Divider />
      <section className="flex flex-col gap-1 mt-5">
        {instructions && (
          <>
            {instructions.map(
              (step, index) =>
                step && (
                  <Card key={index}>
                    <CardBody>
                      <p>
                        <span className="mr-2 text-primary">{index + 1}.</span>
                        {step}
                      </p>
                    </CardBody>
                  </Card>
                )
            )}
          </>
        )}
      </section>
    </DefaultLayout>
  );
}
