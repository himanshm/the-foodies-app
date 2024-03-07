### Suspense

Suspense is a component provided by React that allows you to handle loading states and show fallback content until some data or resource has been loaded.

NextJS embraces this suspense component and this React concept, and makes sure that whenever you have a component the one, which performs some data fetching and returns such a promise, that such components will trigger suspense to show the fallback until they're done.

So you don't need to do anything else. You just have to set up the fallback prop on this suspense component and find the fallback content that should be shown whilst that wrapped component is loading some data.

```
async function Meals() {
  const mealsData = await getMeals();
  const meals: MealsType[] | undefined = mealsData;

  if (!meals) {
    notFound();
  }

  return <MealsGrid meals={meals} />;
}


<Suspense fallback={<p className={styles.loading}>Fetcing Meals...</p>}>
    <Meals />
</Suspense>
```
