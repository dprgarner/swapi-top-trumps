import React from 'react';
import styled from 'styled-components';

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

const GameLayout = ({
  children,
  playPeopleRound,
  playStarshipsRound,
}: GameLayoutProps) => (
  <Layout>
    {children}
    <ButtonGroup>
      <Button onClick={playPeopleRound}>Play People Round</Button>
      <Button onClick={playStarshipsRound}>Play Starships Round</Button>
    </ButtonGroup>
  </Layout>
);

export default GameLayout;
