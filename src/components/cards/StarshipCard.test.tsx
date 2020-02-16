import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { wait, render } from '@testing-library/react';
import { GET_STARSHIP_QUERY, default as StarshipCard } from './StarshipCard';

const executorMock = {
  request: {
    query: GET_STARSHIP_QUERY,
    variables: {
      id: 'c3RhcnNoaXBzOjE1',
    },
  },

  result: {
    data: {
      starship: {
        id: 'c3RhcnNoaXBzOjE1',
        name: 'Executor',
        model: 'Executor-class star dreadnought',
        hyperdriveRating: 2,
        length: 19000,
        crew: '279144',
        passengers: '38000',
        filmConnection: {
          edges: [
            {
              node: {
                title: 'The Empire Strikes Back',
              },
            },
            {
              node: {
                title: 'Return of the Jedi',
              },
            },
          ],
        },
      },
    },
  },
};

it('renders Executor', async () => {
  const { getByText } = render(
    <MockedProvider mocks={[executorMock]} addTypename={false}>
      <StarshipCard id="c3RhcnNoaXBzOjE1" victor={false} />
    </MockedProvider>,
  );
  const getField = (name: string | RegExp) => getByText(name).parentNode;
  await wait(
    () => {
      expect(getField(/Name/)).toHaveTextContent('Name: Executor');
      expect(getField(/Model/)).toHaveTextContent(
        'Executor-class star dreadnought',
      );
      expect(getField(/Hyperdrive Rating/)).toHaveTextContent('2');
      expect(getField(/Length/)).toHaveTextContent('Length: 19000m');
      expect(getField(/Crew/)).toHaveTextContent('Crew: 279144');
      expect(getField(/Passengers/)).toHaveTextContent('Passengers: 38000');
    },
    { timeout: 100 },
  );
});
