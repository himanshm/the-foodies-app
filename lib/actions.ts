'use server';

import { redirect } from 'next/navigation';
// async function shareMeal(formData: FormData) {
//   const meal = {
//     title: formData.get('title'),
//     summary: formData.get('summary'),
//     instructions: formData.get('instructions'),
//     image: formData.get('image'),
//     creator: formData.get('name'),
//     creator_email: formData.get('email'),
//   };

//   console.log(meal);
// }

// export default shareMeal;

import { saveMeal } from './meals';
import slugify from 'slugify';

async function shareMeal(formData: FormData) {
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const instructions = formData.get('instructions') as string;
  const image = formData.get('image') as File;
  const creator = formData.get('name') as string;
  const creator_email = formData.get('email') as string;

  // const slug = slugify(title, { lower: true });

  const meal = {
    // slug: slug,
    title: title,
    summary: summary,
    instructions: instructions,
    image: image,
    creator: creator,
    creator_email: creator_email,
  };

  // console.log(meal);
  await saveMeal(meal);
  redirect('/meals');
}

export default shareMeal;
