[FullStackOpen Part 7 source](https://fullstackopen.com/en/part7)

[Part 7 Exercises main folder](https://github.com/gricius/FullStackOpen-Part7)

# 7.7: country hook
Let's return to exercises 2.18-2.20.

Use the code from https://github.com/fullstack-hy2020/country-hook as your starting point.

The application can be used to search for a country's details from the service in https://studies.cs.helsinki.fi/restcountries/. If a country is found, the details of the country are displayed:

![country info](https://fullstackopen.com/static/b705259ca07b94ce736ac882dbbce776/5a190/69ea.png)

If no country is found, a message is displayed to the user:

![if country not found](https://fullstackopen.com/static/b8f3f1b250a195526cc2816eb8f69c41/5a190/70ea.png)

The application is otherwise complete, but in this exercise, you have to implement a custom hook useCountry, which can be used to search for the details of the country given to the hook as a parameter.

Use the API endpoint name to fetch a country's details in a useEffect hook within your custom hook.

Note that in this exercise it is essential to use useEffect's second parameter array to control when the effect function is executed. See the course part 2 for more info how the second parameter could be used.

