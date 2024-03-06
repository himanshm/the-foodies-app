import sql from 'better-sqlite3';

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

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Adding extra delay
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug: string): MealsType | undefined {
  const mealData = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);

  if (mealData) {
    return mealData as MealsType; // Type assertion
  }
  return undefined;
}
