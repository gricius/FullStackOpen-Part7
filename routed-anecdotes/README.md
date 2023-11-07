# [FullStackOpen Part 7](https://fullstackopen.com/en/part7)

# 7.1: routed anecdotes, step1
Add React Router to the application so that by clicking links in the Menu component the view can be changed.

At the root of the application, meaning the path /, show the list of anecdotes:

![root app](https://fullstackopen.com/static/57c61f000e5eddce42c3a345c2819b77/5a190/40.png)

The Footer component should always be visible at the bottom.

The creation of a new anecdote should happen e.g. in the path create:

![footer](https://fullstackopen.com/static/c393db40b64e8eadd1220bdfccc8eede/5a190/41.png)

# 7.2: routed anecdotes, step2
Implement a view for showing a single anecdote:

![show sinlgle anecdote](https://fullstackopen.com/static/3287ad77ebb90dfac2d734d9801b20b0/5a190/42.png)

Navigating to the page showing the single anecdote is done by clicking the name of that anecdote:

![show single anecdote](https://fullstackopen.com/static/116f966d64a03287b86a6e6a03f6ba81/5a190/43.png)

# 7.3: routed anecdotes, step3
The default functionality of the creation form is quite confusing because nothing seems to be happening after creating a new anecdote using the form.

Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next five seconds:

![add notification function](https://fullstackopen.com/static/7640caca8b2a611c4f6203f343b996f9/5a190/44.png)

# 7.4: anecdotes and hooks step1
Simplify the anecdote creation form of your application with the useField custom hook we defined earlier.

One natural place to save the custom hooks of your application is in the /src/hooks/index.js file.

If you use the named export instead of the default export:

```jsx
import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}
```

Then importing happens in the following way:

```jsx
import  { useField } from './hooks'

const App = () => {
  // ...
  const username = useField('text')
  // ...
}
```

# 7.5: anecdotes and hooks step2
Add a button to the form that you can use to clear all the input fields:

![reset button](https://fullstackopen.com/static/1bce1cdac08279ba132f61a614900b94/5a190/61ea.png)

Expand the functionality of the useField hook so that it offers a new reset operation for clearing the field.

Depending on your solution, you may see the following warning in your console:

![warning](https://fullstackopen.com/static/c4f6d266117f4d881d1df60a4ca3b9f5/5a190/62ea.png)

We will return to this warning in the next exercise.

# 7.6: anecdotes and hooks step3
If your solution did not cause a warning to appear in the console, you have already finished this exercise.

If you see the warning in the console, make the necessary changes to get rid of the Invalid value for prop `reset` on <input> tag console warning.

The reason for this warning is that after making the changes to your application, the following expression:

```jsx
<input {...content}/>
```

Essentially, is the same as this:

```jsx
<input
  value={content.value} 
  type={content.type}
  onChange={content.onChange}

  reset={content.reset}
/>
```

The input element should not be given a reset attribute.

One simple fix would be to not use the spread syntax and write all of the forms like this:

```jsx
<input
  value={username.value} 
  type={username.type}
  onChange={username.onChange}
/>
```

If we were to do this, we would lose much of the benefit provided by the useField hook. Instead, come up with a solution that fixes the issue, but is still easy to use with spread syntax.