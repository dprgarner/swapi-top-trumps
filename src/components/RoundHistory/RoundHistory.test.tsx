import React from 'react';
import { render } from '@testing-library/react';

import { StarshipsRound, PeopleRound } from '../../types';
import RoundHistory from './RoundHistory';

const rounds: (PeopleRound | StarshipsRound)[] = [
  {
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
  },
  {
    type: 'starships',
    starships: [
      {
        id: 'c3RhcnNoaXBzOjE3',
        name: 'Rebel transport',
        hyperdriveRating: 3,
      },
      {
        id: 'c3RhcnNoaXBzOjEx',
        name: 'Y-wing',
        hyperdriveRating: 1,
      },
      {
        id: 'c3RhcnNoaXBzOjk=',
        name: 'Death Star',
        hyperdriveRating: 4,
      },
    ],
  },
];

it('renders a list of past rounds', () => {
  const { getByText } = render(<RoundHistory rounds={rounds} />);
  expect(getByText('Death Star').nodeName.toLowerCase()).toBe('strong');
  expect(getByText(/Death Star/).parentNode?.textContent).toEqual(
    'Rebel transport vs Y-wing vs Death Star',
  );

  expect(getByText('Greedo').nodeName.toLowerCase()).toBe('strong');
  expect(getByText(/Greedo/).parentNode?.textContent).toEqual(
    'Luminara Unduli vs Greedo',
  );
});
