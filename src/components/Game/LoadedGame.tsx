import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';

import { PeopleRound, StarshipsRound } from '../../types';
import Round from '../Round';
import GameLayout from '../GameLayout';
import RoundHistory from '../RoundHistory';

import { RandomStarship } from './gen/RandomStarship';
import { RandomPerson } from './gen/RandomPerson';
import getRandom from './getRandom';
import { RANDOM_PERSON, RANDOM_STARSHIP } from './queries';
import Note from './Note';

type RoundsState = (StarshipsRound | PeopleRound)[];

type LoadedGameProps = {
  peopleIds: string[];
  starshipIds: string[];
};

const LoadedGame = ({ peopleIds, starshipIds }: LoadedGameProps) => {
  const client = useApolloClient();
  const [rounds, setRounds] = useState<RoundsState>([]);
  const [players, setPlayers] = useState(2);

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

export default LoadedGame;
