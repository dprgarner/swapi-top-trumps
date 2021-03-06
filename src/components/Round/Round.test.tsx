import React from 'react';
import { render } from '@testing-library/react';

import Round from './Round';
import { StarshipsRound, PeopleRound } from '../../types';

jest.mock('../cards', () => ({
  PersonCard: ({ id }: { id: string }) => <span>{`PersonCard: ${id}`}</span>,
  StarshipCard: ({ id }: { id: string }) => (
    <span>{`StarshipCard: ${id}`}</span>
  ),
}));

const peopleRound: PeopleRound = {
  type: 'people',
  people: [
    {
      id: 'cGVvcGxlOjY0',
      name: 'Luminara Unduli',
      height: 170,
    },
    {
      id: 'cGVvcGxlOjE1',
      name: 'Greedo',
      height: 173,
    },
  ],
};

const starshipsRound: StarshipsRound = {
  type: 'starships',
  starships: [
    {
      id: 'c3RhcnNoaXBzOjE3',
      name: 'Rebel transport',
      hyperdriveRating: 4,
    },
    {
      id: 'c3RhcnNoaXBzOjEx',
      name: 'Y-wing',
      hyperdriveRating: 1,
    },
  ],
};

const defaultProps = {
  playPeopleRound: jest.fn(),
  playStarshipsRound: jest.fn(),
};

it('renders a spaceships round', () => {
  const { queryByText } = render(
    <Round {...defaultProps} round={starshipsRound} />,
  );
  expect(queryByText('StarshipCard: c3RhcnNoaXBzOjE3')).toBeInTheDocument();
  expect(queryByText('StarshipCard: c3RhcnNoaXBzOjEx')).toBeInTheDocument();
});

it('renders a people round', () => {
  const { queryByText } = render(
    <Round {...defaultProps} round={peopleRound} />,
  );
  expect(queryByText('PersonCard: cGVvcGxlOjY0')).toBeInTheDocument();
  expect(queryByText('PersonCard: cGVvcGxlOjE1')).toBeInTheDocument();
});

it('displays the ships winner', () => {
  const { queryByText } = render(
    <Round {...defaultProps} round={starshipsRound} />,
  );
  expect(queryByText('Winner: Rebel transport (4)')).toBeInTheDocument();
});

it('displays the people winner', () => {
  const { queryByText } = render(
    <Round {...defaultProps} round={peopleRound} />,
  );
  expect(queryByText('Winner: Greedo (173cm)')).toBeInTheDocument();
});

it('displays a draw', () => {
  const { queryByText } = render(
    <Round
      {...defaultProps}
      round={{
        type: 'starships',
        starships: [
          {
            id: 'c3RhcnNoaXBzOjYz',
            name: 'Republic attack cruiser',
            hyperdriveRating: 1,
          },
          {
            id: 'c3RhcnNoaXBzOjc1',
            name: 'V-wing',
            hyperdriveRating: 1,
          },
        ],
      }}
    />,
  );
  expect(queryByText('Draw')).toBeInTheDocument();
});
