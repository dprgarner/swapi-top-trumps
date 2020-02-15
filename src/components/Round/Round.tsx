import React from 'react';
import styled from 'styled-components';
import { PersonCard, StarshipCard } from '../cards';
import { StarshipsRound, PeopleRound } from '../../types';

export type RoundProps = {
  round?: StarshipsRound | PeopleRound;
  playStarshipsRound: () => void;
  playPeopleRound: () => void;
};

const CardGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 0 0 auto;
  justify-content: space-between;
`;

const Winner = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column;
  flex: 1 0 auto;
  font-size: 20px;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

type Person = { id: string; name: string; height: number };
const getPeopleWinner = (people: Person[]): Person | null => {
  const max = people.reduce((acc, person) =>
    acc && acc.height > person.height ? acc : person,
  );
  if (people.filter(person => person.height === max.height).length > 1) {
    return null;
  }
  return max;
};

type Starship = { id: string; name: string; hyperdriveRating: number };
const getStarshipWinner = (starships: Starship[]): Starship | null => {
  const max = starships.reduce((acc, starship) =>
    acc && acc.hyperdriveRating > starship.hyperdriveRating ? acc : starship,
  );
  if (
    starships.filter(
      starship => starship.hyperdriveRating === max.hyperdriveRating,
    ).length > 1
  ) {
    return null;
  }
  return max;
};

const Round = ({ round }: { round?: StarshipsRound | PeopleRound }) => {
  if (!round) return null;
  if (round.type === 'people') {
    const winner = getPeopleWinner(round.people);
    return (
      <>
        <CardGroup>
          {round.people.map(({ id }) => (
            <PersonCard key={id} id={id} victor={id === winner?.id} />
          ))}
        </CardGroup>
        <Winner>
          {winner ? `Winner: ${winner.name} (${winner.height}cm)` : 'Draw'}
        </Winner>
      </>
    );
  }
  if (round.type === 'starships') {
    const winner = getStarshipWinner(round.starships);
    return (
      <>
        <CardGroup>
          {round.starships.map(({ id }) => (
            <StarshipCard key={id} id={id} victor={id === winner?.id} />
          ))}
        </CardGroup>
        <Winner>
          {winner
            ? `Winner: ${winner.name} (${winner.hyperdriveRating})`
            : 'Draw'}
        </Winner>
      </>
    );
  }
  return null;
};

export default Round;
