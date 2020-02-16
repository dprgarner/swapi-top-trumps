import React, { useState } from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';

import { GetAllPeople } from './gen/GetAllPeople';
import { GetAllStarships } from './gen/GetAllStarships';
import { RandomStarship } from './gen/RandomStarship';
import { RandomPerson } from './gen/RandomPerson';
import { PeopleRound, StarshipsRound } from '../../types';
import getRandom from './getRandom';
import Round from '../Round';
import GameLayout from '../GameLayout';
import RoundHistory from '../RoundHistory';
import styled from 'styled-components';

type RoundsState = (StarshipsRound | PeopleRound)[];

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

const Note = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [players, setPlayers] = useState(2);

  if (peopleLoading || starshipLoading) {
    return <Note>{'Loading...'}</Note>;
  }
  if (
    peopleError ||
    starshipError ||
    !peopleData?.allPeople?.edges ||
    !starshipData?.allStarships?.edges
  ) {
    return <Note>{':('}</Note>;
  }
  const peopleIds = peopleData.allPeople.edges
    .filter(person => person?.node?.height)
    .map(person => person?.node?.id) as string[];
  const starshipIds = starshipData.allStarships.edges
    .filter(starship => starship?.node?.hyperdriveRating)
    .map(starship => starship?.node?.id) as string[];

  const playPeopleRound = () => {
    const people = getRandom(players, peopleIds).map(id => {
      const res = client.readFragment<RandomPerson>({
        id,
        fragment: RANDOM_PERSON,
      });
      if (!res || !res?.id || !res?.name || !res?.height) {
        throw new Error('missing people data');
      }
      const { name, height } = res;
      return { id, name, height };
    });
    setRounds(r => [{ type: 'people', people }, ...r]);
  };
  const playStarshipsRound = () => {
    const starships = getRandom(players, starshipIds).map(id => {
      const res = client.readFragment<RandomStarship>({
        id,
        fragment: RANDOM_STARSHIP,
      });
      if (!res || !res?.id || !res?.name || !res?.hyperdriveRating) {
        throw new Error('missing starship data');
      }
      const { name, hyperdriveRating } = res;
      return { id, name, hyperdriveRating };
    });
    setRounds(r => [{ type: 'starships', starships }, ...r]);
  };

  return (
    <GameLayout
      playStarshipsRound={playStarshipsRound}
      playPeopleRound={playPeopleRound}
      players={players}
      setPlayers={setPlayers}
    >
      <Switch>
        <Route path="/history">
          <RoundHistory rounds={rounds} />
        </Route>
        <Route path="/">
          {rounds[0] ? (
            <Round round={rounds[0]} />
          ) : (
            <Note>No rounds played yet.</Note>
          )}
        </Route>
      </Switch>
    </GameLayout>
  );
};

export default Game;
