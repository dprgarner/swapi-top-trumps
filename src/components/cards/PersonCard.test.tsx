import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { GET_PERSON_QUERY, default as PersonCard } from './PersonCard';
import { wait, render } from '@testing-library/react';

const darthVaderMock = {
  request: {
    query: GET_PERSON_QUERY,
    variables: {
      id: 'cGVvcGxlOjQ=',
    },
  },

  result: {
    data: {
      person: {
        id: 'cGVvcGxlOjQ=',
        name: 'Darth Vader',
        species: {
          name: 'Human',
        },
        height: 202,
        mass: 136,
        homeworld: {
          name: 'Tatooine',
        },
        filmConnection: {
          edges: [
            {
              node: {
                title: 'A New Hope',
              },
            },
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
            {
              node: {
                title: 'Revenge of the Sith',
              },
            },
          ],
        },
      },
    },
  },
};

it('renders Darth Vader', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={[darthVaderMock]} addTypename={false}>
      <PersonCard id="cGVvcGxlOjQ=" victor={false} />
    </MockedProvider>,
  );
  await wait(() => {
    expect(queryByText('Darth Vader')).toBeTruthy();
    expect(queryByText(/Species:/)).toBeTruthy();
    expect(queryByText(/Human/)).toBeTruthy();
    expect(queryByText(/Homeworld:/)).toBeTruthy();
    expect(queryByText('Tatooine')).toBeTruthy();
    expect(queryByText('Height:')).toBeTruthy();
    expect(queryByText('202cm')).toBeTruthy();
    expect(queryByText('Mass:')).toBeTruthy();
    expect(queryByText('136kg')).toBeTruthy();
  });
});
