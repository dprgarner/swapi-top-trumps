import getRandom from './getRandom';

it('picks random unique values', () => {
  const xs = getRandom(2, ['b', 'a']);
  expect(xs.sort()).toEqual(['a', 'b']);
});

it('throws if there are not enough values', () => {
  expect(() => getRandom(3, ['b', 'a'])).toThrow();
});
