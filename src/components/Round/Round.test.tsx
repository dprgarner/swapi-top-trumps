import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Round, { RoundProps } from './Round';
import { ShipsRound, PeopleRound } from '../../types';

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

const shipsRound: ShipsRound = {
  type: 'ships',
  ships: [
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

const defaultProps: RoundProps = {
  playPeopleRound: jest.fn(),
  playStarshipsRound: jest.fn(),
};

it('renders nothing when no round', () => {
  const { queryByText } = render(<Round {...defaultProps} />);
  expect(queryByText('Play Starships Round')).toBeInTheDocument();
  expect(queryByText(/StarshipCard/)).not.toBeInTheDocument();
  expect(queryByText(/PeopleCard/)).not.toBeInTheDocument();
});

it('renders a spaceships round', () => {
  const { queryByText } = render(
    <Round {...defaultProps} round={shipsRound} />,
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

it('plays more rounds', () => {
  const playPeopleRound = jest.fn();
  const playStarshipsRound = jest.fn();
  const { getByText } = render(
    <Round
      playPeopleRound={playPeopleRound}
      playStarshipsRound={playStarshipsRound}
    />,
  );
  fireEvent.click(getByText(/Play People Round/));
  expect(playPeopleRound).toHaveBeenCalled();
  fireEvent.click(getByText(/Play Starships Round/));
  expect(playStarshipsRound).toHaveBeenCalled();
});

it('shows buttons when a round has been played', () => {
  const { getByText } = render(<Round {...defaultProps} round={peopleRound} />);
  expect(getByText(/Play People Round/)).toBeInTheDocument();
  expect(getByText(/Play Starships Round/)).toBeInTheDocument();
});
