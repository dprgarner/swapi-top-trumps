import React, { useState } from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';

import { GetAllPeople } from './gen/GetAllPeople';
import { GetAllStarships } from './gen/GetAllStarships';
import { RandomStarship } from './gen/RandomStarship';
import { RandomPerson } from './gen/RandomPerson';

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

type RoundsState = (
  | {
      ships: {
        id: string;
        name: string;
        hyperdriveRating: number;
      }[];
    }
  | {
      people: {
        id: string;
        name: string;
        height: number;
      }[];
    }
)[];

function getRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

const RANDOM_STARSHIP = gql`
  fragment RandomStarship on Starship {
    id
    name
    hyperdriveRating
  }
`;
const RANDOM_PERSON = gql`
  fragment RandomPerson on Person {
    id
    name
    height
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
  const client = useApolloClient();
  const [rounds, setRounds] = useState<RoundsState>([]);

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

  const playStarshipsRound = (players: number = 2) => {
    const ships = [...Array(players)].map(() => {
      const res = client.readFragment<RandomStarship>({
        id: getRandom(starshipIds),
        fragment: RANDOM_STARSHIP,
      });
      if (!res || !res?.id || !res?.name || !res?.hyperdriveRating) {
        throw new Error('missing starship data');
      }
      const { id, name, hyperdriveRating } = res;
      return { id, name, hyperdriveRating };
    });
    setRounds(r => [{ ships }, ...r]);
  };
  const playPeopleRound = (players: number = 2) => {
    const people = [...Array(players)].map(() => {
      const res = client.readFragment<RandomPerson>({
        id: getRandom(peopleIds),
        fragment: RANDOM_PERSON,
      });
      if (!res || !res?.id || !res?.name || !res?.height) {
        throw new Error('missing starship data');
      }
      const { id, name, height } = res;
      return { id, name, height };
    });
    setRounds(r => [{ people }, ...r]);
  };

  return (
    <>
      <button onClick={() => playStarshipsRound()}>Play Ships</button>
      <button onClick={() => playPeopleRound()}>Play People</button>
      <pre>{JSON.stringify(rounds, null, 2)}</pre>
    </>
  );
};

export default Game;
