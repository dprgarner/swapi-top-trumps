import React from 'react';
import styled from 'styled-components';
import { PeopleRound, StarshipsRound } from '../../types';
import { getPeopleWinner, getStarshipWinner } from '../../winnerUtils';

type RoundHistoryProps = {
  rounds: (PeopleRound | StarshipsRound)[];
};

const RoundCard = styled.div<{ isPerson?: boolean }>`
  background: ${props => (props.isPerson ? '#ff5e7b' : '#8edbe5')};
  border-radius: 8px;
  border: 1px solid #363b3b;
  color: #222;
  margin: 16px auto 0;
  padding: 16px;
  text-align: center;
  min-width: 600px;
`;

const PersonRound = ({ round }: { round: PeopleRound }) => {
  const winner = getPeopleWinner(round.people);
  return (
    <RoundCard isPerson>
      {round.people.map((person, i) => (
        <React.Fragment key={i}>
          {i !== 0 ? ' vs ' : null}
          {winner?.id === person.id ? (
            <strong>{person.name}</strong>
          ) : (
            person.name
          )}
        </React.Fragment>
      ))}
    </RoundCard>
  );
};

const StarshipRound = ({ round }: { round: StarshipsRound }) => {
  const winner = getStarshipWinner(round.starships);
  return (
    <RoundCard>
      {round.starships.map((starship, i) => (
        <React.Fragment key={i}>
          {i !== 0 ? ' vs ' : null}
          {winner?.id === starship.id ? (
            <strong>{starship.name}</strong>
          ) : (
            starship.name
          )}
        </React.Fragment>
      ))}
    </RoundCard>
  );
};

const RoundHistory = ({ rounds }: RoundHistoryProps) => {
  return (
    <>
      {rounds.map((round, i) =>
        round.type === 'people' ? (
          <PersonRound key={i} round={round} />
        ) : (
          <StarshipRound key={i} round={round} />
        ),
      )}
    </>
  );
};

export default RoundHistory;
