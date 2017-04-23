var expect = require('chai').expect;
var TopPhrases = require('../TopPhrases.jsx');

/* 
  Part 2 - TopPhrases objext: Keep track of top Phrases
*/
describe('Instantiate new TopPhrases object,', () => {
  it('should create a new object with defaults', () => {
    let expectedTopTenObj = {
      maxTrackedPhrases: 10,
      phrases: {}
    }

    let actualTopTenObj = new TopPhrases(10);

    expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
  });
});

