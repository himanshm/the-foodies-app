import Link from 'next/link';
import styles from './page.module.css';
import MealsGrid from '@/components/meals/meals.grid';
import { getMeals } from '../../../lib/meals';

type Meals = {
  id: string;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export default async function MealsPage() {
  const mealsData = await getMeals();
  const meals: Meals[] = mealsData as Meals[];
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={styles.highlight}>by you.</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun.
        </p>
        <p className={styles.cta}>
          <Link href='/meals/share'>Share your favourite Recipe</Link>
        </p>
      </header>
      <main>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
