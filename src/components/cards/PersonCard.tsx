import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { GetPerson, GetPersonVariables } from './gen/GetPerson';
import rebelLogo from './rebel.svg';

type PersonCardProps = {
  id: string;
};

const cardWidth = 350;

const Card = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  margin: 10px;
  max-width: ${cardWidth}px;
  overflow: hidden;
`;

const CardLogo = styled.img`
  width: ${cardWidth}px;
`;

const CardFields = styled.div`
  /* border: 1px solid green; */
  /* max-width: 300px; */
  padding: 10px;
  /* border-radius: 5px; */
`;

type CardFieldProps = {
  name: string;
  value: string | number | null | undefined;
  units?: string;
};

const CardField = ({ name, value, units }: CardFieldProps) =>
  value ? (
    <div>
      <span>
        <strong>{name}: </strong>
      </span>
      <span>{`${value}${units || ''}`}</span>
    </div>
  ) : null;

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
  if (error || !data) {
    throw error;
  }
  if (!data.person) {
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
