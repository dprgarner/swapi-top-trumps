import React from 'react';
import styled from 'styled-components';

const cardWidth = 350;

export const Card = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  margin: 10px;
  max-width: ${cardWidth}px;
  overflow: hidden;
`;

export const CardLogo = styled.img`
  width: ${cardWidth}px;
`;

export const CardFields = styled.div`
  padding: 10px;
`;

type CardFieldProps = {
  name: string;
  value: string | number | null | undefined;
  units?: string;
};

export const CardField = ({ name, value, units }: CardFieldProps) =>
  value ? (
    <div>
      <span>
        <strong>{name}: </strong>
        {`${value}${units || ''}`}
      </span>
    </div>
  ) : null;
