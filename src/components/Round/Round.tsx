import React from 'react';
import { PersonCard, StarshipCard } from '../cards';

const peopleRound = {
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

const shipsRound = {
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

const Round = () => (
  <>
    <PersonCard id="cGVvcGxlOjQ=" />
    <StarshipCard id="c3RhcnNoaXBzOjE1" />
  </>
);

export default Round;
