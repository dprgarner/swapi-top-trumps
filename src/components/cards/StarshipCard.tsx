import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { GetStarship, GetStarshipVariables } from './gen/GetStarship';
import { Card, CardFields, CardField, CardLogo } from './cardComponents';
import empireLogo from './empire.svg';

type StarshipCardProps = {
  id: string;
};

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
      <CardLogo src={empireLogo} alt={data.starship.name || 'Starship'} />
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
