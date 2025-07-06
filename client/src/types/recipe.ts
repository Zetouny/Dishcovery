export type Recipe = {
  meals: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strArea: string;
    strCategory: string;
    strInstructions: string;
    strYoutube: string;
    [key: string]: string;
  }[];
};
