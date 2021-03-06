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

    it('result is 1: should remove all subsets and return a new sorted phrase array with 1 phrase', () => {
      let expectedResult = expectedPhraseArrays.removedAllSubsets3;

      let sortedPhraseArray = expectedPhraseArrays.sortedPhraseArray3;
      let actualResult = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray);

      expect(actualResult).to.be.an('array');
      expect(actualResult).to.have.lengthOf(1);
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('result > 1: should remove all subsets and return a new sorted phrase array', () => {
      let expectedResult = expectedPhraseArrays.removedAllSubsets2;

      let sortedPhraseArray = expectedPhraseArrays.sortedPhraseArray2;


      let actualResult = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });
  });

  describe('Get top array of phrases', () => {
    it('should return undefined if parameters are undefined or empty', () => {
      let sortedPhrasesSubsetsRemoved1 = undefined;
      let sortedPhrasesSubsetsRemoved2 = [];
      let numberOfPhrases1 = 5;

      let sortedPhrasesSubsetsRemoved3 = expectedPhraseArrays.sortedPhrasesSubsetsRemoved1;
      let numberOfPhrases2 = undefined;


      let actualResult1 = TopPhrases.getTopArrayOfPhrases(sortedPhrasesSubsetsRemoved1, numberOfPhrases1, true);
      let actualResult2 = TopPhrases.getTopArrayOfPhrases(sortedPhrasesSubsetsRemoved2, numberOfPhrases1, true);
      let actualResult3 = TopPhrases.getTopArrayOfPhrases(sortedPhrasesSubsetsRemoved3, numberOfPhrases2, true);

      expect(actualResult1).to.be.undefined;
      expect(actualResult2).to.be.undefined;
      expect(actualResult3).to.be.undefined;
    });

    it('should return top number of phrases specified in parameters (no ties)', () => {
      let expectedResult = expectedPhraseArrays.topPhrasesArray1;
      let numberOfPhrases = 5;

      let actualResult = TopPhrases.getTopArrayOfPhrases(expectedPhraseArrays.sortedPhrasesSubsetsRemoved1, numberOfPhrases, true);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('should return all phrases of the same count if that count is within the top number of phrases specified (ties exist)', () => {
      let expectedResult = expectedPhraseArrays.topPhrasesArray2;
      let numberOfPhrases = 5;

      let actualResult = TopPhrases.getTopArrayOfPhrases(expectedPhraseArrays.sortedPhrasesSubsetsRemoved2, numberOfPhrases, true);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('should return a single phrase if only a single phrase given', () => {
      let expectedResult = expectedPhraseArrays.sortedPhrasesSubsetsRemoved3;
      let numberOfPhrases = 5;

      let actualResult = TopPhrases.getTopArrayOfPhrases(expectedPhraseArrays.sortedPhrasesSubsetsRemoved3, numberOfPhrases, true);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
      expect(actualResult).to.have.lengthOf(1);
    });

    it('should return the entire given phrase array if all are same count > top number', () => {
      let expectedResult = expectedPhraseArrays.removedAllSubsets2;
      let numberOfPhrases = 5;

      let actualResult = TopPhrases.getTopArrayOfPhrases(expectedPhraseArrays.removedAllSubsets2, numberOfPhrases, true);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('should not return any phrases with a single count if the includeSinglesBool is false', () => {
      let expectedResult = expectedPhraseArrays.topPhrasesArray2GreaterThanOne;
      let numberOfPhrases = 10;

      let actualResult = TopPhrases.getTopArrayOfPhrases(expectedPhraseArrays.sortedPhrasesSubsetsRemoved2, numberOfPhrases, false);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('should return an empty array if the includeSinglesBool is false and all counts are 1', () => {
      let expectedResult = [];
      let numberOfPhrases = 10;
      console.log("Expected", expectedResult)
      let actualResult = TopPhrases.getTopArrayOfPhrases(expectedPhraseArrays.sortedPhraseArray2, numberOfPhrases, false);
      console.log("Actual", actualResult)

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });
  });

  describe('Determine top phrases', () => {
    it('should return undefined if phraseObj or numberOfPhrases is undefined or empty', () => {
      let phraseObj1 = undefined;
      let phraseObj2 = [];
      let numberOfPhrases = undefined;

      let actualResult1 = TopPhrases.determineTopPhrases(phraseObj1, 10)
      let actualResult2 = TopPhrases.determineTopPhrases(phraseObj1, 10);
      let actualResult3 = TopPhrases.determineTopPhrases(expectedPhraseArrays.phraseObj, numberOfPhrases);

      expect(actualResult1).to.be.undefined;
      expect(actualResult2).to.be.undefined;
      expect(actualResult3).to.be.undefined;
    });
  });
});