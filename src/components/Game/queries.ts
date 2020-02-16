import { gql } from '@apollo/client';

export const GET_ALL_PEOPLE = gql`
  query GetAllPeople {
    allPeople {
      totalCount
      edges {
        node {
          id
          name
          height
        }
      }
    }
  }
`;

export const GET_ALL_STARSHIPS = gql`
  query GetAllStarships {
    allStarships {
      totalCount
      edges {
        node {
          id
          name
          hyperdriveRating
        }
      }
    }
  }
`;

export const RANDOM_PERSON = gql`
  fragment RandomPerson on Person {
    id
    name
    height
  }
`;

export const RANDOM_STARSHIP = gql`
  fragment RandomStarship on Starship {
    id
    name
    hyperdriveRating
  }
`;
