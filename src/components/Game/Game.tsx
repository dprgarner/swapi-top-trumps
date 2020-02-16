import React from 'react';
import { useQuery } from '@apollo/client';

import { GetAllPeople } from './gen/GetAllPeople';
import { GetAllStarships } from './gen/GetAllStarships';
import { GET_ALL_PEOPLE, GET_ALL_STARSHIPS } from './queries';
import Note from './Note';
import LoadedGame from './LoadedGame';

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

  return <LoadedGame peopleIds={peopleIds} starshipIds={starshipIds} />;
};

export default Game;
