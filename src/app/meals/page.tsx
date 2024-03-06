import { Suspense } from 'react';
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

async function Meals() {
  const mealsData = await getMeals();
  const meals: Meals[] = mealsData as Meals[];

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
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
        <Suspense fallback={<p className={styles.loading}>Fetcing Meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
