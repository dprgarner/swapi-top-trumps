import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { GetPerson, GetPersonVariables } from './gen/GetPerson';
import { Card, CardFields, CardField, CardLogo } from './cardComponents';
import rebelLogo from './rebel.svg';

type PersonCardProps = {
  id: string;
};

export const GET_PERSON_QUERY = gql`
  query GetPerson($id: ID!) {
    person(id: $id) {
      id
      name
      species {
        name
      }
      homeworld {
        name
      }
      height
      mass
      filmConnection {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`;

const PersonCard = ({ id }: PersonCardProps) => {
  const { data, loading, error } = useQuery<GetPerson, GetPersonVariables>(
    GET_PERSON_QUERY,
    {
      variables: {
        id,
      },
    },
  );
  if (loading) return <span>...</span>;
  if (error) {
    throw error;
  }
  if (!data || !data.person) {
    throw new Error('Invalid ID');
  }

  return (
    <Card>
      <CardLogo src={rebelLogo} alt={data.person.name || 'Person'} />
      <CardFields>
        <CardField name="Name" value={data.person.name} />
        <CardField name="Species" value={data.person.species?.name} />
        <CardField name="Homeworld" value={data.person.homeworld?.name} />
        <CardField name="Height" value={data.person.height} units="cm" />
        <CardField name="Mass" value={data.person.mass} units="kg" />
        <CardField
          name="Film Appearances"
          value={(data.person.filmConnection?.edges || [])
            .map(film => film?.node?.title || '')
            .join(', ')}
        />
      </CardFields>
    </Card>
  );
};

export default PersonCard;
