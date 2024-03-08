import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

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

export type Meal = {
  slug?: string;
  title: string;
  image: File | string;
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

export async function saveMeal(meal: Meal) {
  meal.slug = slugify(meal.title, { lower: true });

  const existingMeal = db
    .prepare('SELECT slug FROM meals WHERE slug = ?')
    .get(meal.slug);
  if (existingMeal) {
    throw new Error('A meal with the same slug already exists');
  }
  meal.instructions = xss(meal.instructions);

  // const extension = meal.image.name.split('.').pop();
  // const fileName = `${meal.slug}${Math.floor(
  //   Math.random() * 100
  // )}.${extension}`;

  // const stream = fs.createWriteStream(`/public/images/${fileName}`);
  // const bufferedImage = await meal.image.arrayBuffer();

  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error('Saving image failed!');
  //   }
  // });

  // meal.image = `/images/${fileName}`;

  let fileName = '';
  if (typeof meal.image !== 'string') {
    // Check if image is a File
    const extension = meal.image.name.split('.').pop();
    fileName = `${meal.slug}${Math.floor(Math.random() * 100)}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error('Saving image failed!');
      }
    });
  } else {
    fileName = meal.image; // If image is already a string (file path), use it directly
  }

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
  )
  `
  ).run(meal);
}
