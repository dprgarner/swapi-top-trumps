/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPerson
// ====================================================

export interface GetPerson_person_species {
  readonly __typename: "Species";
  /**
   * The name of this species.
   */
  readonly name: string | null;
}

export interface GetPerson_person_homeworld {
  readonly __typename: "Planet";
  /**
   * The name of this planet.
   */
  readonly name: string | null;
}

export interface GetPerson_person_filmConnection_edges_node {
  readonly __typename: "Film";
  /**
   * The title of this film.
   */
  readonly title: string | null;
}

export interface GetPerson_person_filmConnection_edges {
  readonly __typename: "PersonFilmsEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: GetPerson_person_filmConnection_edges_node | null;
}

export interface GetPerson_person_filmConnection {
  readonly __typename: "PersonFilmsConnection";
  /**
   * A list of edges.
   */
  readonly edges: ReadonlyArray<(GetPerson_person_filmConnection_edges | null)> | null;
}

export interface GetPerson_person {
  readonly __typename: "Person";
  /**
   * The ID of an object
   */
  readonly id: string;
  /**
   * The name of this person.
   */
  readonly name: string | null;
  /**
   * The species that this person belongs to, or null if unknown.
   */
  readonly species: GetPerson_person_species | null;
  /**
   * A planet that this person was born on or inhabits.
   */
  readonly homeworld: GetPerson_person_homeworld | null;
  /**
   * The height of the person in centimeters.
   */
  readonly height: number | null;
  /**
   * The mass of the person in kilograms.
   */
  readonly mass: number | null;
  readonly filmConnection: GetPerson_person_filmConnection | null;
}

export interface GetPerson {
  readonly person: GetPerson_person | null;
}

export interface GetPersonVariables {
  readonly id: string;
}
