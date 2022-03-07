import { BasicSum } from '../UnitTestSetup'

it('sums numbers', () => {
  expect(BasicSum(1, 2)).toEqual(3);
  expect(BasicSum(1, 5)).toEqual(6);
});
