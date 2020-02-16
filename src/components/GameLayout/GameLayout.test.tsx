import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameLayout from './GameLayout';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';

it('renders buttons and children', () => {
  const { getByText } = render(
    <MemoryRouter>
      <GameLayout playPeopleRound={jest.fn()} playStarshipsRound={jest.fn()}>
        <span>Hello world!</span>
      </GameLayout>
      ,
    </MemoryRouter>,
  );
  expect(getByText('Hello world!')).toBeInTheDocument();
  expect(getByText(/Play Starships Round/)).toBeInTheDocument();
});

it('calls play callbacks', () => {
  const playPeopleRound = jest.fn();
  const playStarshipsRound = jest.fn();
  const { getByText } = render(
    <MemoryRouter>
      <GameLayout
        playPeopleRound={playPeopleRound}
        playStarshipsRound={playStarshipsRound}
      >
        <span>Hello world!</span>
      </GameLayout>
    </MemoryRouter>,
  );
  fireEvent.click(getByText(/Play People Round/));
  expect(playPeopleRound).toHaveBeenCalled();

  fireEvent.click(getByText(/Play Starships Round/));
  expect(playStarshipsRound).toHaveBeenCalled();
});

it('switches route', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <GameLayout playPeopleRound={jest.fn()} playStarshipsRound={jest.fn()}>
        <span>Hello world!</span>
      </GameLayout>
    </Router>,
  );
  fireEvent.click(getByText(/View History/));
  expect(history.location.pathname).toBe('/history');

  fireEvent.click(getByText(/View Last Round/));
  expect(history.location.pathname).toBe('/');
});
