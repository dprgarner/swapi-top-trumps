type Person = { id: string; name: string; height: number };
export const getPeopleWinner = (people: Person[]): Person | null => {
  const max = people.reduce((acc, person) =>
    acc && acc.height > person.height ? acc : person,
  );
  if (people.filter(person => person.height === max.height).length > 1) {
    return null;
  }
  return max;
};

type Starship = { id: string; name: string; hyperdriveRating: number };
export const getStarshipWinner = (starships: Starship[]): Starship | null => {
  const max = starships.reduce((acc, starship) =>
    acc && acc.hyperdriveRating > starship.hyperdriveRating ? acc : starship,
  );
  if (
    starships.filter(
      starship => starship.hyperdriveRating === max.hyperdriveRating,
    ).length > 1
  ) {
    return null;
  }
  return max;
};
