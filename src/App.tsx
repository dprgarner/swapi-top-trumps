import React from 'react';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { PersonCard } from './components/cards';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
    fetchOptions: {
      method: 'POST',
    },
  }),
});

/*
query getStarship {
  starship(id: "c3RhcnNoaXBzOjE1") {
    id
    name
    model
    hyperdriveRating
    length
    crew
    passengers
    filmConnection {
      edges {
        node {
          title
        }
      }
    }
  }
}

query getAllPeople {
  allPeople {
    totalCount
    edges {
      node {
        id
        height
      }
    }
  }
}

query getAllStarships {
  allStarships {
    totalCount
    edges {
      node {
        id
        hyperdriveRating
      }
    }
  }
}
*/

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
          <div style={{}}>
            <PersonCard id="cGVvcGxlOjQ=" />
          </div>
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
