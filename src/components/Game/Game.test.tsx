import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Game, { GET_ALL_PEOPLE, GET_ALL_STARSHIPS } from './Game';
import { InMemoryCache } from '@apollo/client';

jest.mock('../cards', () => ({
  PersonCard: ({ id }: { id: string }) => <span>{`PersonCard: ${id}`}</span>,
  StarshipCard: ({ id }: { id: string }) => (
    <span>{`StarshipCard: ${id}`}</span>
  ),
}));

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
              __typename: 'Person',
              id: 'cGVvcGxlOjE=',
              name: 'Luke Skywalker',
              height: 172,
            },
          },
          {
            node: {
              __typename: 'Person',
              id: 'cGVvcGxlOjQ=',
              name: 'Darth Vader',
              height: 202,
            },
          },
          {
            node: {
              __typename: 'Person',
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
              __typename: 'Starship',
              id: 'c3RhcnNoaXBzOjEw',
              name: 'Millennium Falcon',
              hyperdriveRating: 0.5,
            },
          },
          {
            node: {
              __typename: 'Starship',
              id: 'c3RhcnNoaXBzOjk=',
              name: 'Death Star',
              hyperdriveRating: 4,
            },
          },
          {
            node: {
              __typename: 'Starship',
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

const ProvidedGame = () => (
  <MockedProvider
    mocks={[peopleMock, starshipsMock]}
    cache={
      new InMemoryCache({
        dataIdFromObject: object => object.id,
      })
    }
  >
    <Game />
  </MockedProvider>
);

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

it('renders the buttons', async () => {
  const { getByText } = render(
    <MockedProvider mocks={[peopleMock, starshipsMock]}>
      <Game />
    </MockedProvider>,
  );
  expect(getByText('Loading...')).toBeInTheDocument();
  await wait(() => {
    expect(getByText('Play Starships Round')).toBeInTheDocument();
    expect(getByText('Play People Round')).toBeInTheDocument();
  });
});

it('adds a spaceship round', async () => {
  const { getByText } = render(<ProvidedGame />);
  await wait(() => {
    expect(getByText('Play Starships Round')).toBeInTheDocument();
  });
  fireEvent.click(getByText('Play Starships Round'));

  await wait(() => {
    expect(getByText('StarshipCard: c3RhcnNoaXBzOjk=')).toBeInTheDocument();
    expect(getByText('StarshipCard: c3RhcnNoaXBzOjEw')).toBeInTheDocument();
    expect(getByText('Winner: Death Star (4)')).toBeInTheDocument();
  });
});

it('adds a people round', async () => {
  const { getByText } = render(<ProvidedGame />);
  await wait(() => {
    expect(getByText('Play People Round')).toBeInTheDocument();
  });
  fireEvent.click(getByText('Play People Round'));

  await wait(() => {
    expect(getByText('PersonCard: cGVvcGxlOjQ=')).toBeInTheDocument();
    expect(getByText('PersonCard: cGVvcGxlOjE=')).toBeInTheDocument();
    expect(getByText('Winner: Darth Vader (202cm)')).toBeInTheDocument();
  });
});

it('adds a people round after a starships round', async () => {
  const { getByText } = render(<ProvidedGame />);
  await wait(() => {
    expect(getByText('Play Starships Round')).toBeInTheDocument();
  });
  fireEvent.click(getByText('Play Starships Round'));
  await wait(() => {
    expect(getByText('Winner: Death Star (4)')).toBeInTheDocument();
  });

  fireEvent.click(getByText('Play People Round'));
  await wait(() => {
    expect(getByText('PersonCard: cGVvcGxlOjQ=')).toBeInTheDocument();
    expect(getByText('PersonCard: cGVvcGxlOjE=')).toBeInTheDocument();
    expect(getByText('Winner: Darth Vader (202cm)')).toBeInTheDocument();
  });
});
