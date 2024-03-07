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

### Server Actions

'use server' inside of a function is different because this creates a so-called Server Action, which is a function that's guaranteed to execute on the server, and only there. So just as components by default are server components which only execute on the server, this is now a function that only executes on a server.

But in case of functions, you must explicitly state that it belongs to the server by adding this directive inside of them if you wanna create such a Server Action.

In addition, to really turn this into a so-called Server Action, you also must add the "async" keyword in front of it. And now this is a Server Action.

But what's now the special thing about this Server Action? Why does this feature exist?

Well, this feature exists in React, by the way, not just in Next.js, but like server components, it doesn't really work in Vanilla React apps. Instead, you need a framework like Next to unlock this feature and use it And this feature then exists because you can now take such a Server Action and assign this Server Action function as a value for the action prop on a function.

So here, I'm setting shareMeal as a value on that action prop of that form here.nAnd that's of course something you might have never seen before, because normally, the action prop is set to the path to which the request should be sent if you are relying on the browser's built-in form handling capabilities.

Now that's not what we're doing here. Instead, we're setting it to an action, to such a Server Action function. And that's a pattern that's supported by Next and React here that will ensure that when this form is submitted, Next.js will, behind the scenes, create a request and send it to this Next.js server that's serving the website so that this function gets triggered, and you can then handle the form submission there, but on the server. So, that function will then execute on the server, not in the client. And this function will then automatically receive that formData that was submitted. So, the data that was gathered by the inputs in the form collected in a formData object, using that FormData class that's available in JavaScript.
