/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPeople
// ====================================================

export interface GetAllPeople_allPeople_edges_node {
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
   * The height of the person in centimeters.
   */
  readonly height: number | null;
}

export interface GetAllPeople_allPeople_edges {
  readonly __typename: "PeopleEdge";
  /**
   * The item at the end of the edge
   */
  readonly node: GetAllPeople_allPeople_edges_node | null;
}

export interface GetAllPeople_allPeople {
  readonly __typename: "PeopleConnection";
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
  readonly edges: ReadonlyArray<(GetAllPeople_allPeople_edges | null)> | null;
}

export interface GetAllPeople {
  readonly allPeople: GetAllPeople_allPeople | null;
}
