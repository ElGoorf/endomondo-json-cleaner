import processEndomondoFileContent from '../index';

const inputFixture = require('./__fixtures__/2016-04-30 22_41_52.0.in.json');
const outputFixture = require('./__fixtures__/2016-04-30 22_41_52.0.out.json');

test('processEndomondoFileContent', () => {
  expect(processEndomondoFileContent(inputFixture)).toEqual(outputFixture);
});
