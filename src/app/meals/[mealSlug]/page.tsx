import Image from 'next/image';
import styles from './page.module.css';
import { getMeal } from '../../../../lib/meals';
import { type MealsType } from '../../../../lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { mealSlug: string };
}) {
  const meal: MealsType | undefined = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}

function MealDetailsPage({ params }: { params: { mealSlug: string } }) {
  const meal: MealsType | undefined = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }
  // Either this or ensure that meal exist or if meal exist only then render its content

  let instructions: string | undefined;
  if (meal.instructions) {
    instructions = meal.instructions.replace(/\n/g, '<br>');
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image
            src={meal.image}
            alt={meal.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className={styles.headerText}>
          {meal && <h1>{meal.title}</h1>}
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: instructions as string }}
        ></p>
      </main>
    </>
  );
}

export default MealDetailsPage;
