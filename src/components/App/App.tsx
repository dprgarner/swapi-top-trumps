import React from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import Game from '../Game';

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id,
  }),
  link: new HttpLink({
    uri: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
    fetchOptions: {
      method: 'POST',
    },
  }),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Game />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
