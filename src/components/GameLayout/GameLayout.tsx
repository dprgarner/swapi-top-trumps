import React from 'react';
import styled from 'styled-components';
import { useHistory, Route, Switch } from 'react-router';

type GameLayoutProps = {
  children: React.ReactNode;
  playPeopleRound: () => void;
  playStarshipsRound: () => void;
};

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  background: #fff;
  border-top: 1px solid #666;
  bottom: 0;
  display: flex;
  flex-flow: row wrap;
  position: fixed;
  width: 100%;
  margin-bottom: 16px;
`;

const Button = styled.button<{ fullWidth?: boolean }>`
  background: #e8e8e8;
  border-radius: 2px;
  border: 1px solid #666;
  color: #222;
  cursor: pointer;
  flex: 1 1 ${props => (props.fullWidth ? '100%' : 'auto')};
  margin: 16px 16px 0;
  padding: 16px;
`;

const GameLayout = ({
  children,
  playPeopleRound,
  playStarshipsRound,
}: GameLayoutProps) => {
  const history = useHistory();
  return (
    <Layout>
      {children}
      <ButtonGroup>
        <Button onClick={playPeopleRound}>Play People Round</Button>
        <Button onClick={playStarshipsRound}>Play Starships Round</Button>
        <Switch>
          <Route path="/history">
            <Button fullWidth onClick={() => history.push('/')}>
              View Last Round
            </Button>
          </Route>
          <Route path="/">
            <Button fullWidth onClick={() => history.push('/history')}>
              View History
            </Button>
          </Route>
        </Switch>
      </ButtonGroup>
    </Layout>
  );
};

export default GameLayout;
