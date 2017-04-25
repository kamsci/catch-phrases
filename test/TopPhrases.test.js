var expect = require('chai').expect;
var TopPhrases = require('../TopPhrases.js');
var expectedPhraseArrays = require('./expectedPhraseArrays.json');

/* 
  Coming Soon! - Tests for TopPhrases class
*/
describe('TopPhrases object,', () => {
  afterEach(function(){
    // clear topPhrase object
    topPhrases = null;
  });

  it('should deafult to 10 phrases and an empty phrasesObj if no parameters are given', () => {
    let expectedObj = {};
    let expectedNumberOfPhrases = 10;

    let topPhrases = new TopPhrases();
    let actualObj = topPhrases.phraseObj;
    let actualNumberOfPhrases = topPhrases.numberOfPhrases;

    expect(expectedObj).to.deep.equal(actualObj);
    expect(expectedNumberOfPhrases).to.deep.equal(actualNumberOfPhrases);
  });
  it('should assign to variables when parameters are given', () => {
    let expectedObj = expectedPhraseArrays.phraseObj;
    let expectedNumberOfPhrases = 5;

    let topPhrases = new TopPhrases(expectedPhraseArrays.phraseObj, 5);
    let actualObj = topPhrases.phraseObj;
    let actualNumberOfPhrases = topPhrases.numberOfPhrases;

    expect(expectedObj).to.deep.equal(actualObj);
    expect(expectedNumberOfPhrases).to.deep.equal(actualNumberOfPhrases);
  });

describe('Turn phrase into sorted Array', () => {
  afterEach(function(){
    // clear topPhrase object
    topPhrases = null;
  });

  it('should return undefined when no phraseObj', () => { 
    let topPhrases = new TopPhrases();
    let actualResult = topPhrases.turnPhraseObjIntoSortedArray();

    expect(actualResult).to.be.undefined;
  });

  it('should create a sortedPhraseArray when passed a phraseObj', () => {
    let expectedResult = expectedPhraseArrays.sortedPhraseArray;
    
    let topPhrases = new TopPhrases(expectedPhraseArrays.phraseObj, 10);
    let actualResult = topPhrases.turnPhraseObjIntoSortedArray();

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should return phrase in array when phraseObj is a single obj', () => { 
    let phraseObj = { "this is a well-thought-out string": 1 };
    let expectedResult = [["this is a well-thought-out string", 1]];

    let topPhrases = new TopPhrases(phraseObj, 10);
    let actualResult = topPhrases.turnPhraseObjIntoSortedArray();

    expect(expectedResult).to.deep.equal(actualResult);
  });
});
  describe('Remove subsets', () => {
    afterEach(function(){
      // clear topPhrase object
      topPhrases = null;
    });
    it('should return undefined when empty or undefined sorted array is passed', () => { 
      let topPhrases1 = [];
      let topPhrases2 = undefined;

      let topPhrases = new TopPhrases();
      let actualResult1 = topPhrases.removeSubsets(topPhrases1);
      let actualResult2 = topPhrases.getTopTenArrayOfPhrases(topPhrases2);

      expect(actualResult1).to.be.undefined;
      expect(actualResult2).to.be.undefined;
    });
    
    it('should remove a single subset', () => {
      let topPhrasesArray = [
        [ "this is a", 4 ],
        [ "make that 3", 4 ],
        [ "sentences and a well-thought-out string", 3 ],
        [ "3 sentences and a well-thought-out", 3 ],
        [ "3 sentences and", 3 ]
      ];

      let expectedResult = [
        [ "this is a", 4 ],
        [ "make that 3", 4 ],
        [ "sentences and a well-thought-out string", 3 ],
        [ "3 sentences and a well-thought-out", 3 ]
      ]
      
      let topPhrases = new TopPhrases();
      let actualResult = topPhrases.removeSubsets(topPhrasesArray);
      console.log("Actual: ", actualResult)

      expect(actualResult).to.be.an('array');
      expect(actualResult).to.have.lengthOf(4)
      expect(expectedResult).to.deep.equal(actualResult);
    });
    it('should remove all subsets - 2', () => {
      let topPhrasesArray = [
        [ "this is a", 4 ],
        [ "make that 3", 4 ],
        [ "3 sentences and a well-thought-out string", 3 ],
        [ "3 sentences and a well-thought-out", 3 ],
        [ "3 sentences and", 3 ]
      ];

      let expectedResult = [
        [ "this is a", 4 ],
        [ "make that 3", 4 ],
        [ "3 sentences and a well-thought-out string", 3 ]
      ]
      
      let topPhrases = new TopPhrases();
      let actualResult = topPhrases.removeSubsets(topPhrasesArray);
      console.log("Actual: ", actualResult)

      expect(actualResult).to.be.an('array');
      expect(actualResult).to.have.lengthOf(3)
      expect(expectedResult).to.deep.equal(actualResult);
    });
  });

  // describe('Get top ten array of phrases', () => {
  //   it('should return undefined when empty or undefined sorted array is passed', () => { 
  //     let sortedArray1 = [];
  //     let sortedArray2 = undefined;

  //     let topPhrases = new TopPhrases();
  //     let actualResult1 = topPhrases.getTopTenArrayOfPhrases(sortedArray1);
  //     let actualResult2 = topPhrases.getTopTenArrayOfPhrases(sortedArray2);

  //     expect(actualResult1).to.be.undefined;
  //     expect(actualResult2).to.be.undefined;
  //   });
  //   it('should return top NumberOfPhrases from sorted array', () => {
  //     let sortedArray = expectedPhraseArrays.sortedPhraseArray;
      
  //     let topPhrases = new TopPhrases();
  //     let actualResult = topPhrases.getTopTenArrayOfPhrases(sortedArray);
  //     console.log("Actual: ", actualResult)

  //     expect(actualResult).to.be.an('array');
  //     expect(actualResult).to.have.lengthOf(topPhrases.numberOfPhrases)
  //     expect(expectedResult).to.deep.equal(actualResult);
  //   });
  // });
});
