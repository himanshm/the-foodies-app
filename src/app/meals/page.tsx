import { Suspense } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import MealsGrid from '@/components/meals/meals.grid';
import { getMeals } from '../../../lib/meals';
import { MealsType } from '../../../lib/meals';
import { notFound } from 'next/navigation';

async function Meals() {
  const mealsData = await getMeals();
  const meals: MealsType[] | undefined = mealsData;

  if (!meals) {
    notFound();
  }

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
