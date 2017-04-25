var expect = require('chai').expect;
var TopPhrases = require('../TopPhrases.js');
var expectedPhraseArrays = require('./expectedPhraseArrays.json');

describe('TopPhrases object,', () => {
  describe('Turn phrase into sorted Array', () => {
    it('should return undefined when phraseObj is undefined or empty', () => {
      let phraseObj1 = {};
      let phraseObj2 = undefined;

      let actualResult1 = TopPhrases.turnPhraseObjIntoSortedArray(phraseObj1);
      let actualResult2 = TopPhrases.turnPhraseObjIntoSortedArray(phraseObj2);

      expect(actualResult1).to.be.undefined;
      expect(actualResult2).to.be.undefined;
    });

    it('should create a sortedPhraseArray when passed a phraseObj', () => {
      let expectedResult = expectedPhraseArrays.sortedPhraseArray1;

      let phraseObj = expectedPhraseArrays.phraseObj;
      let actualResult = TopPhrases.turnPhraseObjIntoSortedArray(phraseObj);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('should return phrase in array when phraseObj is a single obj', () => {
      let expectedResult = [["this is a well-thought-out string", 1]];

      let phraseObj = { "this is a well-thought-out string": 1 };
      let actualResult = TopPhrases.turnPhraseObjIntoSortedArray(phraseObj);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });
  });

});