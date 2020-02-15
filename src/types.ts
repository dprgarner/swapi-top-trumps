export type StarshipsRound = {
  type: 'starships';
  starships: {
    id: string;
    name: string;
    hyperdriveRating: number;
  }[];
};

export type PeopleRound = {
  type: 'people';
  people: {
    id: string;
    name: string;
    height: number;
  }[];
};
