import Image from 'next/image';
import styles from './page.module.css';
import { getMeal } from '../../../../lib/meals';
import { type MealsType } from '../../../../lib/meals';

function MealDetailsPage({ params }: { params: { mealSlug: string } }) {
  const meal: MealsType | undefined = getMeal(params.mealSlug);

  let instructions: string | undefined;
  if (meal?.instructions) {
    instructions = meal?.instructions.replace(/\n/g, '<br>');
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          {meal && (
            <Image
              src={meal.image}
              alt={meal.title}
              fill
            />
          )}
        </div>
        <div className={styles.headerText}>
          {meal && <h1>{meal.title}</h1>}
          <p className={styles.creator}>
            by{' '}
            {meal && (
              <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            )}
          </p>
          <p className={styles.summary}>{meal?.summary}</p>
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
