import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

export type MealsType = {
  id: string;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

const db = sql('meals.db');

export async function getMeals(): Promise<MealsType[] | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Adding extra delay
  const mealsData = db.prepare('SELECT * FROM meals').all();

  if (mealsData) {
    return mealsData as MealsType[];
  }

  return undefined;
}

export function getMeal(slug: string): MealsType | undefined {
  const mealData = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);

  if (mealData) {
    return mealData as MealsType; // Type assertion
  }
  return undefined;
}

export function saveMeal(meal: MealsType) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
