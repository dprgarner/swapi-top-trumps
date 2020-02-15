import React, { useState } from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';

import { GetAllPeople } from './gen/GetAllPeople';
import { GetAllStarships } from './gen/GetAllStarships';
import { RandomStarship } from './gen/RandomStarship';
import { RandomPerson } from './gen/RandomPerson';
import { PeopleRound, ShipsRound } from '../../types';
import Round from '../Round';

type RoundsState = (ShipsRound | PeopleRound)[];

function getRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

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

const RANDOM_PERSON = gql`
  fragment RandomPerson on Person {
    id
    name
    height
  }
`;

const RANDOM_STARSHIP = gql`
  fragment RandomStarship on Starship {
    id
    name
    hyperdriveRating
  }
`;

const players = 2;

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
  const peopleIds = peopleData.allPeople.edges
    .filter(person => person?.node?.height)
    .map(person => person?.node?.id) as string[];
  const starshipIds = starshipData.allStarships.edges
    .filter(ship => ship?.node?.hyperdriveRating)
    .map(ship => ship?.node?.id) as string[];

  const playPeopleRound = () => {
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
    setRounds(r => [{ type: 'people', people }, ...r]);
  };
  const playStarshipsRound = () => {
    const ships = [...Array(players)].map(() => {
      console.log(players);
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
    console.log(JSON.stringify(ships));
    setRounds(r => [{ type: 'ships', ships }, ...r]);
  };
  console.log(rounds);

  return (
    <>
      <Round
        round={rounds[0]}
        playStarshipsRound={playStarshipsRound}
        playPeopleRound={playPeopleRound}
      />
    </>
  );
};

export default Game;
