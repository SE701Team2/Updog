import { BasicSub } from '../UnitTestSetup2'

it('subtracts numbers', () => {
  expect(BasicSub(1, 2)).toEqual(-1);
  expect(BasicSub(1, 5)).toEqual(-4);
});