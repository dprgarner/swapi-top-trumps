/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllStarships
// ====================================================

export interface GetAllStarships_allStarships_edges_node {
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
   * The class of this starships hyperdrive.
   */
  readonly hyperdriveRating: number | null;
}

export interface GetAllStarships_allStarships_edges {
  readonly __typename: "StarshipsEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: GetAllStarships_allStarships_edges_node | null;
}

export interface GetAllStarships_allStarships {
  readonly __typename: "StarshipsConnection";
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  readonly totalCount: number | null;
  /**
   * A list of edges.
   */
  readonly edges: ReadonlyArray<(GetAllStarships_allStarships_edges | null)> | null;
}

export interface GetAllStarships {
  readonly allStarships: GetAllStarships_allStarships | null;
}
