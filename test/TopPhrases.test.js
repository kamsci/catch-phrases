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

    it('should remove all subsets and return a new sorted phrase array', () => {
      let expectedResult = expectedPhraseArrays.removedAllSubsets1;

      let sortedPhraseArray = expectedPhraseArrays.sortedPhraseArray1;
      let actualResult = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray);
      // console.log("Actual", actualResult)
      // console.log("Original", sortedPhraseArray)

      expect(actualResult).to.be.an('array');
      expect(actualResult).to.have.lengthOf(3);
      expect(expectedResult).to.deep.equal(actualResult);
    });

    it('should remove all subsets and return a new array', () => {
      let expectedResult = [
        ['better because our front-end operations team is there to serve', 1],
        ['the customer sees a cluttered', 1],
        ['customer sees a cluttered madhouse', 1],
        ['they will not want to', 1],
        ['will not want to shop', 1],
        ['want our customer to see', 1],
        ['a warm greeting goes a', 1],
        ['our customers what a totally', 1],
        ['totally amazing company feels like', 1],
        ['do you know what an', 1],
        ['collected to run our front-end operations', 1],
        ['to run our front-end operations team', 1]
      ];

      let sortedPhraseArray = [

        ['better because our front-end operations team is there to serve', 1],
        ['customer sees a cluttered', 1],
        ['they will not want', 1], // outer i 3, inner k 0; new i 2, k 0
        ['will not want to', 1],
        ['not want to shop', 1],
        ['a warm greeting goes', 1],
        ['do you know what', 1],
        ['run our front-end operations team', 1],
        ['the customer sees a cluttered', 1],
        ['customer sees a cluttered madhouse', 1],
        ['they will not want to', 1],
        ['will not want to shop', 1],
        ['want our customer to see', 1],
        ['a warm greeting goes a', 1],
        ['our customers what a totally', 1],
        ['totally amazing company feels like', 1],
        ['do you know what an', 1],
        ['collected to run our front-end operations', 1],
        ['to run our front-end operations team', 1]
      ];


      let actualResult = TopPhrases.checkAndRemoveSubsets(sortedPhraseArray);
      // console.log("Actual", actualResult)
      // console.log("Original", sortedPhraseArray)

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    });
  });

});