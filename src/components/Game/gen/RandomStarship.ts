/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RandomStarship
// ====================================================

export interface RandomStarship {
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
