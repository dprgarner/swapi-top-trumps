import React from 'react';
import styled from 'styled-components';
import { PersonCard, StarshipCard } from '../cards';
import { ShipsRound, PeopleRound } from '../../types';

export type RoundProps = {
  round?: ShipsRound | PeopleRound;
  playStarshipsRound: () => void;
  playPeopleRound: () => void;
};

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

const ButtonGroup = styled.div`
  display: flex;
`;

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const CardGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const RoundCards = ({ round }: { round?: ShipsRound | PeopleRound }) => {
  if (!round) return null;
  if (round.type === 'people') {
    return (
      <>
        {round.people.map(({ id }) => (
          <PersonCard key={id} id={id} />
        ))}
      </>
    );
  }
  if (round.type === 'ships') {
    return (
      <>
        {round.ships.map(({ id }) => (
          <StarshipCard key={id} id={id} />
        ))}
      </>
    );
  }
  return null;
};

const Round = ({ round, playPeopleRound, playStarshipsRound }: RoundProps) => (
  <Layout>
    <CardGroup>
      <RoundCards round={round} />
    </CardGroup>
    <ButtonGroup>
      <Button onClick={playPeopleRound}>Play People Round</Button>
      <Button onClick={playStarshipsRound}>Play Starships Round</Button>
    </ButtonGroup>
  </Layout>
);

export default Round;
