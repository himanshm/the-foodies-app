'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

function isInvalidText(text: string) {
  return !text || text.trim() === '';
}

async function shareMeal(formData: FormData) {
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const instructions = formData.get('instructions') as string;
  const image = formData.get('image') as File;
  const creator = formData.get('name') as string;
  const creator_email = formData.get('email') as string;

  const meal = {
    title: title,
    summary: summary,
    instructions: instructions,
    image: image,
    creator: creator,
    creator_email: creator_email,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error('Invalid Input!');
  }
  await saveMeal(meal);
  redirect('/meals');
}

export default shareMeal;
