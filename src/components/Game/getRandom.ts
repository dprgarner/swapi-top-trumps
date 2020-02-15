export default function getRandom<T>(players: number, items: T[]): T[] {
  const newItems: T[] = [];
  const candidates: T[] = [...items];
  while (newItems.length < players) {
    if (!candidates.length) {
      throw new Error('Not enough unique values');
    }
    const newIdx = Math.floor(Math.random() * candidates.length);
    newItems.push(...candidates.splice(newIdx, 1));
  }
  return newItems;
}
