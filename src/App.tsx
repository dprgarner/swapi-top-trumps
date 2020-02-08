import React from 'react';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
  ApolloProvider,
} from '@apollo/client';
import { GetPerson } from './gen/GetPerson';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
    fetchOptions: {
      method: 'POST',
    },
  }),
});

const GET_PERSON_QUERY = gql`
  query GetPerson {
    person(id: "cGVvcGxlOjQ=") {
      id
      name
      species {
        name
      }
      height
      mass
      homeworld {
        name
      }
      filmConnection {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`;

const Thing = () => {
  const { data } = useQuery<GetPerson>(GET_PERSON_QUERY);

  if (!data) return <span>...</span>;
  if (!data.person) {
    throw new Error('Invalid ID');
  }

  return (
    <>
      <div>{data.person.name}</div>
      <div>{data.person.height}</div>
      <div>{data.person.homeworld?.name}</div>
      {<pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
};
const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Thing />
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
