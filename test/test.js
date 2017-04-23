var expect = require('chai').expect;
var TopTenPhrases = require('../index.js');
var expectedPhraseArrays = require('./expectedPhraseArrays.json');


// Part 1 - Find Phrases and store in dictionary
describe('String to sentence array', () => {
  it('should return an empty array if given an empty or undefined string', () => {
    let string = "";
    let string2;
    let expectedResult = [];

    let actualResult = TopTenPhrases.stringToSentenceArray(string);
    let actualResult2 = TopTenPhrases.stringToSentenceArray(string2);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);

    expect(actualResult2).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult2);
  });

  it('should separate a string into an array of sentences on (. ! ? ;)', () => {
    let string = "This is a well-thought-out string. It has two sentences. No wait! Make that 3 sentences; or is it 4 sentences and a question?";
    let expectedResult = ["This is a well-thought-out string", "It has two sentences", "No wait", "Make that 3 sentences", "or is it 4 sentences and a question"];

    let actualResult = TopTenPhrases.stringToSentenceArray(string);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should remove specific punctuation: commas, colons, parenthesis, and hyphens that are not part of a hyphenated word', () => {
    let string = "This is a well-thought-out string. It has two sentences: not one, but two sentences (although short). No - wait! Make that 3 sentences; or is it 4 sentences and a question?";
    let expectedResult = ["This is a well-thought-out string", "It has two sentences not one but two sentences although short", "No wait", "Make that 3 sentences", "or is it 4 sentences and a question"];

    let actualResult = TopTenPhrases.stringToSentenceArray(string);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should remove specific punctuation at the END OR BEGINING of string/sentence', () => {
    let string = "((This is a well-thought-out string). It has two sentences: not one, but two sentences. No - wait! Make that 3 sentences; -or is it 4 sentences and a question,?)";
    let expectedResult = ["This is a well-thought-out string", "It has two sentences not one but two sentences", "No wait", "Make that 3 sentences", "or is it 4 sentences and a question"];

    let actualResult = TopTenPhrases.stringToSentenceArray(string);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });
});

describe('Check sentence for pharases', () => {
  it('should return an empty array if given an empty or undefined string', () => {
    let string = "";
    let string2;
    let expectedResult = [];

    let actualResult = TopTenPhrases.checkSentenceForPhrases(string, 3);
    let actualResult2 = TopTenPhrases.checkSentenceForPhrases(string2, 3);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);

    expect(actualResult2).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult2);
  });

  it('should return an empty array if given a phraseLength less than 0 or greater than number of words', () => {
    let string = "It has two well-thought-out sentences not one but two well-thought-out sentences";
    let expectedResult = [];

    let actualResult = TopTenPhrases.checkSentenceForPhrases(string, -1);
    let actualResult2 = TopTenPhrases.checkSentenceForPhrases(string, 100);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);

    expect(actualResult2).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult2);
  });

  it('should return the sentence as an array if given a phraseLength equal to number of words', () => {
    let string = "It has two well-thought-out sentences not one but two sentences";
    let expectedResult = ["It has two well-thought-out sentences not one but two sentences"];

    let actualResult = TopTenPhrases.checkSentenceForPhrases(string, 10);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should separate a sentence into phrases based on any phraseLength', () => {
    let string = "It has two well-thought-out sentences not one but two well-thought-out sentences";

    for(let i = 3; i <= 10; i++){
      let expectedResult = expectedPhraseArrays[i.toString()];
      let actualResult = TopTenPhrases.checkSentenceForPhrases(string,  i);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    }
  });

});

describe('Adding a phrase to a dictionary', () => {
  it('should NOT add an empty string if given an empty string', () => {
    let phrase = "";
    let phrase2;
    let expectedDictionary = {};

    let actualDictionary = {};
    TopTenPhrases.addPhraseToDictionary(actualDictionary, phrase);
    TopTenPhrases.addPhraseToDictionary(actualDictionary, phrase2);

    expect(actualDictionary).to.deep.equal(expectedDictionary);
  });

  it('should check phrase and either add or increase count in dictionary', () => {
    let phraseArr = ["It has two", "has two well-thought-out", "two well-thought-out sentences", "well-thought-out sentences not", "sentences not one", "not one but", "one but two", "but two well-thought-out", "two well-thought-out sentences"];
    let expectedDictionary = {
      "it has two": 1,
      "has two well-thought-out": 1, 
      "two well-thought-out sentences": 2, 
      "well-thought-out sentences not": 1, 
      "sentences not one": 1, 
      "not one but": 1, 
      "one but two": 1, 
      "but two well-thought-out": 1
    }

    let actualDictionary = {};
    phraseArr.forEach(function(phrase) {
      TopTenPhrases.addPhraseToDictionary(actualDictionary, phrase);
    });

    expect(actualDictionary).to.deep.equal(expectedDictionary);
  });

  it('should be case insensitive', () => {
    let phraseCapitalized = "It Has Two";
    let phraseLower = "it has two";
    let expectedDictionary = {
      "it has two": 2
    }

    let actualDictionary = {};
    TopTenPhrases.addPhraseToDictionary(actualDictionary, phraseCapitalized);
    TopTenPhrases.addPhraseToDictionary(actualDictionary, phraseLower);

    expect(actualDictionary).to.deep.equal(expectedDictionary);
  });
});

// Part 2: Pull Top Ten most used phrases from dictionary
// describe('pulling Top Ten most used phrases from dictionary', () => {
//   it('should ', () => {
//     let phrase
//   })
// });