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

  describe('Check and remove subsets', () => {
    it('should return undefined if newPhrase is undefined, empty, or not a string', () => {
      let sortedPhraseArray1 = undefined;
      let sortedPhraseArray2 = [];

      let actualResult1 = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray1)
      let actualResult2 = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray2);

      expect(actualResult1).to.be.undefined;
      expect(actualResult2).to.be.undefined;
    });

    it('result < 10: should remove all subsets and return a new sorted phrase array', () => {
      let expectedResult = expectedPhraseArrays.removedAllSubsets1;

      let sortedPhraseArray = expectedPhraseArrays.sortedPhraseArray1;
      let actualResult = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray);

      expect(actualResult).to.be.an('array');
      expect(actualResult).to.have.lengthOf(3);
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('result > 10: should remove all subsets and return a new sorted phrase array', () => {
      let expectedResult = expectedPhraseArrays.removedAllSubsets2;

      let sortedPhraseArray = expectedPhraseArrays.sortedPhraseArray2;


      let actualResult = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });
  });

});