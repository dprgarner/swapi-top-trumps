import React from 'react';
import styled from 'styled-components';
import { PersonCard, StarshipCard } from '../cards';
import { StarshipsRound, PeopleRound } from '../../types';
import { getPeopleWinner, getStarshipWinner } from '../../winnerUtils';

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
  margin-bottom: 200px;
`;

const Round = ({ round }: { round: StarshipsRound | PeopleRound }) => {
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
