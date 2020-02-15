import React from 'react';
import styled from 'styled-components';
import { PersonCard, StarshipCard } from '../cards';
import { StarshipsRound, PeopleRound } from '../../types';

export type RoundProps = {
  round?: StarshipsRound | PeopleRound;
  playStarshipsRound: () => void;
  playPeopleRound: () => void;
};

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

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

const ButtonGroup = styled.div`
  display: flex;
  flex: 0 0 auto;
`;

const Button = styled.button`
  background: #e8e8e8;
  border-radius: 2px;
  border: 1px solid #666;
  color: #222;
  cursor: pointer;
  flex: 1 0 auto;
  margin: 16px;
  padding: 16px;
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

const RoundCards = ({ round }: { round?: StarshipsRound | PeopleRound }) => {
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

const Round = ({ round, playPeopleRound, playStarshipsRound }: RoundProps) => (
  <Layout>
    <RoundCards round={round} />
    <ButtonGroup>
      <Button onClick={playPeopleRound}>Play People Round</Button>
      <Button onClick={playStarshipsRound}>Play Starships Round</Button>
    </ButtonGroup>
  </Layout>
);

export default Round;
