import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { GetStarship, GetStarshipVariables } from './gen/GetStarship';
import rebelLogo from './rebel.svg';

type StarshipCardProps = {
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
        {`${value}${units || ''}`}
      </span>
    </div>
  ) : null;

export const GET_STARSHIP_QUERY = gql`
  query GetStarship($id: ID!) {
    starship(id: $id) {
      id
      name
      model
      hyperdriveRating
      length
      crew
      passengers
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

const StarshipCard = ({ id }: StarshipCardProps) => {
  const { data, loading, error } = useQuery<GetStarship, GetStarshipVariables>(
    GET_STARSHIP_QUERY,
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
  if (!data.starship) {
    throw new Error('Invalid ID');
  }

  return (
    <Card>
      <CardLogo src={rebelLogo} alt={data.starship.name || 'Starship'} />
      <CardFields>
        <CardField name="Name" value={data.starship.name} />
        <CardField name="Model" value={data.starship.model} />
        <CardField
          name="Hyperdrive Rating"
          value={data.starship.hyperdriveRating}
        />
        <CardField name="Length" value={data.starship.length} units="m" />
        <CardField name="Crew" value={data.starship.crew} />
        <CardField name="Passengers" value={data.starship.passengers} />
        <CardField
          name="Film Appearances"
          value={(data.starship.filmConnection?.edges || [])
            .map(film => film?.node?.title || '')
            .join(', ')}
        />
      </CardFields>
    </Card>
  );
};

export default StarshipCard;
