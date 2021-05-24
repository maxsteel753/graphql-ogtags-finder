const meta= require('./metadata/meta');
/*
    Unit Testing to check meta fetcher fucntion
*/
describe('Og Tag Fetcher Test-1', () => {
    it('My Test Case ', () => {
      expect(meta.getMetaData('https://google.com')).resolves.not.toBe({});
      expect(meta.getMetaData('https://googm')).resolves.toBe({});
    });
});