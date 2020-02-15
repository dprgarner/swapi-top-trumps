import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { PersonCard, StarshipCard } from './components/cards';
import { GetAllPeople } from './gen/GetAllPeople';
import { GetAllStarships } from './gen/GetAllStarships';

export const GET_ALL_PEOPLE = gql`
  query GetAllPeople {
    allPeople {
      totalCount
      edges {
        node {
          id
          name
          height
        }
      }
    }
  }
`;

export const GET_ALL_STARSHIPS = gql`
  query GetAllStarships {
    allStarships {
      totalCount
      edges {
        node {
          id
          name
          hyperdriveRating
        }
      }
    }
  }
`;

const Game = () => {
  const {
    data: peopleData,
    loading: peopleLoading,
    error: peopleError,
  } = useQuery<GetAllPeople>(GET_ALL_PEOPLE);
  const {
    data: starshipData,
    loading: starshipLoading,
    error: starshipError,
  } = useQuery<GetAllStarships>(GET_ALL_STARSHIPS);

  if (peopleLoading || starshipLoading) {
    return <>{'Loading...'}</>;
  }
  if (
    peopleError ||
    starshipError ||
    !peopleData?.allPeople?.edges ||
    !starshipData?.allStarships?.edges
  ) {
    return <>{':('}</>;
  }
  const starshipIds = starshipData.allStarships.edges
    .filter(ship => ship?.node?.hyperdriveRating)
    .map(ship => ship?.node?.id) as string[];
  const peopleIds = peopleData.allPeople.edges
    .filter(person => person?.node?.height)
    .map(person => person?.node?.id) as string[];

  return (
    <>
      <PersonCard id="cGVvcGxlOjQ=" />
      <StarshipCard id="c3RhcnNoaXBzOjE1" />
    </>
  );
};

export default Game;
