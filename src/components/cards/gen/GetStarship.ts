/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStarship
// ====================================================

export interface GetStarship_starship_filmConnection_edges_node {
  readonly __typename: "Film";
  /**
   * The title of this film.
   */
  readonly title: string | null;
}

export interface GetStarship_starship_filmConnection_edges {
  readonly __typename: "StarshipFilmsEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: GetStarship_starship_filmConnection_edges_node | null;
}

export interface GetStarship_starship_filmConnection {
  readonly __typename: "StarshipFilmsConnection";
  /**
   * A list of edges.
   */
  readonly edges: ReadonlyArray<(GetStarship_starship_filmConnection_edges | null)> | null;
}

export interface GetStarship_starship {
  readonly __typename: "Starship";
  /**
   * The ID of an object
   */
  readonly id: string;
  /**
   * The name of this starship. The common name, such as "Death Star".
   */
  readonly name: string | null;
  /**
   * The model or official name of this starship. Such as "T-65 X-wing" or "DS-1
   * Orbital Battle Station".
   */
  readonly model: string | null;
  /**
   * The class of this starships hyperdrive.
   */
  readonly hyperdriveRating: number | null;
  /**
   * The length of this starship in meters.
   */
  readonly length: number | null;
  /**
   * The number of personnel needed to run or pilot this starship.
   */
  readonly crew: string | null;
  /**
   * The number of non-essential people this starship can transport.
   */
  readonly passengers: string | null;
  readonly filmConnection: GetStarship_starship_filmConnection | null;
}

export interface GetStarship {
  readonly starship: GetStarship_starship | null;
}

export interface GetStarshipVariables {
  readonly id: string;
}
