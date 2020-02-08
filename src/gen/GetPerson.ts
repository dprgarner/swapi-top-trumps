/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPerson
// ====================================================

export interface GetPerson_person_species {
  __typename: "Species";
  /**
   * The name of this species.
   */
  name: string | null;
}

export interface GetPerson_person_homeworld {
  __typename: "Planet";
  /**
   * The name of this planet.
   */
  name: string | null;
}

export interface GetPerson_person_filmConnection_edges_node {
  __typename: "Film";
  /**
   * The title of this film.
   */
  title: string | null;
}

export interface GetPerson_person_filmConnection_edges {
  __typename: "PersonFilmsEdge";
  /**
   * The item at the end of the edge
   */
  node: GetPerson_person_filmConnection_edges_node | null;
}

export interface GetPerson_person_filmConnection {
  __typename: "PersonFilmsConnection";
  /**
   * A list of edges.
   */
  edges: (GetPerson_person_filmConnection_edges | null)[] | null;
}

export interface GetPerson_person {
  __typename: "Person";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * The name of this person.
   */
  name: string | null;
  /**
   * The species that this person belongs to, or null if unknown.
   */
  species: GetPerson_person_species | null;
  /**
   * The height of the person in centimeters.
   */
  height: number | null;
  /**
   * The mass of the person in kilograms.
   */
  mass: number | null;
  /**
   * A planet that this person was born on or inhabits.
   */
  homeworld: GetPerson_person_homeworld | null;
  filmConnection: GetPerson_person_filmConnection | null;
}

export interface GetPerson {
  person: GetPerson_person | null;
}
