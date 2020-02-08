# Swapi

## Random Notes

https://docs.google.com/document/d/1L3rPSx5HNBW1JmrklqqdjZ1TAOfKxJ8GgqmjwZtCo44/edit

Routes:

/
/starships
/people
/history

- Store history in React state? Or window local storage? Or Apollo cache? start with history for now.
- Tests
- Fetch total count of people and starships on page load.
- Pick k distinct from n items.

Cpts:

- Card
- StarshipCard
- PersonCard
- BattlePage
- buttons
  - Play/Play Again
  - Switch to Starships/People
  - See History (?)
  - Play Starships
  - Play People
- HistoryEntry
- HistoryPage

## Updating the GraphQL metadata

To update the schema:

```
yarn update-schema
```

This is unlikely to happen often as the SWAPI is fairly stable.

To update the generated TypeScript types for GraphQL queries:

```
yarn update-types
```

or, to start in watch mode:

```
yarn update-types --watch
```

At present, the codegen tool creates an empty globalTypesFile that can't be handled by the default create-react-app settings. The workaround here is to generate the file outside of the `src/` directory.

## Original CRA readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
