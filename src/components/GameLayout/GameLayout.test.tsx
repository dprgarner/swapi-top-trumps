import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameLayout from './GameLayout';

it('renders buttons and children', () => {
  const playPeopleRound = jest.fn();
  const playStarshipsRound = jest.fn();
  const { getByText } = render(
    <GameLayout
      playPeopleRound={playPeopleRound}
      playStarshipsRound={playStarshipsRound}
    >
      <span>Hello world!</span>
    </GameLayout>,
  );
  expect(getByText('Hello world!')).toBeInTheDocument();
  expect(getByText(/Play Starships Round/)).toBeInTheDocument();

  fireEvent.click(getByText(/Play People Round/));
  expect(playPeopleRound).toHaveBeenCalled();

  fireEvent.click(getByText(/Play Starships Round/));
  expect(playStarshipsRound).toHaveBeenCalled();
});
