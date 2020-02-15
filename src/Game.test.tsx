import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import Game, { GET_ALL_PEOPLE, GET_ALL_STARSHIPS } from './Game';

const peopleMock = {
  request: {
    query: GET_ALL_PEOPLE,
  },

  result: {
    data: {
      allPeople: {
        totalCount: 3,
        edges: [
          {
            node: {
              id: 'cGVvcGxlOjE=',
              name: 'Luke Skywalker',
              height: 172,
            },
          },
          {
            node: {
              id: 'cGVvcGxlOjQ=',
              name: 'Darth Vader',
              height: 202,
            },
          },
          {
            node: {
              id: 'cGVvcGxlOjg4',
              name: 'Captain Phasma',
              height: null,
            },
          },
        ],
      },
    },
  },
};

const starshipsMock = {
  request: {
    query: GET_ALL_STARSHIPS,
  },

  result: {
    data: {
      allStarships: {
        totalCount: 3,
        edges: [
          {
            node: {
              id: 'c3RhcnNoaXBzOjEw',
              name: 'Millennium Falcon',
              hyperdriveRating: 0.5,
            },
          },
          {
            node: {
              id: 'c3RhcnNoaXBzOjk=',
              name: 'Death Star',
              hyperdriveRating: 4,
            },
          },

          {
            node: {
              id: 'c3RhcnNoaXBzOjc3',
              name: 'T-70 X-wing fighter',
              hyperdriveRating: null,
            },
          },
        ],
      },
    },
  },
};

it('renders an error state', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Game />
    </MockedProvider>,
  );
  expect(queryByText('Loading...')).toBeInTheDocument();
  await wait(() => {
    expect(queryByText(':(')).toBeInTheDocument();
  });
});

it.skip('provides a list of valid people and spaceships', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Game />
    </MockedProvider>,
  );
  expect(queryByText('Loading...')).toBeInTheDocument();
  await wait(() => {
    expect(queryByText(':(')).toBeInTheDocument();
  });
});
