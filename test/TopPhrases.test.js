var expect = require('chai').expect;
var TopPhrases = require('../TopPhrases.js');
var expectedPhraseArrays = require('./expectedPhraseArrays.json');


/* 
  Coming Soon! - Tests for TopPhrases class
*/
describe('Instantiate new TopPhrases object,', () => {
  it('should create a sortedPhraseArray when passed a phraseObj', () => {
    let expectedResult = expectedPhraseArrays.sortedPhraseArray;
    
    let topPhrases = new TopPhrases(expectedPhraseArrays.phraseObj);
    let actualResult = topPhrases.turnPhraseObjIntoSortedArray();

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });
  it('should return undefined when no phraseObj', () => { 
    let topPhrases = new TopPhrases();
    let actualResult = topPhrases.turnPhraseObjIntoSortedArray();

    expect(actualResult).to.be.undefined;
  });
});
