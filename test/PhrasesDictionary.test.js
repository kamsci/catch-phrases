var expect = require('chai').expect;
var PhrasesDictionary = require('../PhrasesDictionary.js');
var expectedPhraseArrays = require('./expectedPhraseArrays.json');

/* 
  Part 1 - Find Phrases and store in dictionary
*/
describe('String to sentence array', () => {
  it('should return undefined if given an empty or undefined string', () => {
    let string = "";
    let string2;

    let myDictionary = new PhrasesDictionary();
    let actualResult = myDictionary.getSentencesFromDocument(string);
    let actualResult2 = myDictionary.getSentencesFromDocument(string2);

    expect(actualResult).to.be.undefined;
    expect(actualResult2).to.be.undefined;
  });

  it('should separate a string into an array of sentences on (. ! ? ;)', () => {
    let string = "This is a well-thought-out string. It has two sentences. No wait! Make that 3 sentences; or is it 4 sentences and a question?";
    let expectedResult = ["This is a well-thought-out string", "It has two sentences", "No wait", "Make that 3 sentences", "or is it 4 sentences and a question"];

    let myDictionary = new PhrasesDictionary();
    let actualResult = myDictionary.getSentencesFromDocument(string);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should remove specific punctuation: commas, colons, parenthesis, and hyphens that are not part of a hyphenated word', () => {
    let string = "This is a well-thought-out string. It has two sentences: not one, but two sentences (although short). No - wait! Make that 3 sentences; or is it 4 sentences and a question?";
    let expectedResult = ["This is a well-thought-out string", "It has two sentences not one but two sentences although short", "No wait", "Make that 3 sentences", "or is it 4 sentences and a question"];

    let myDictionary = new PhrasesDictionary();
    let actualResult = myDictionary.getSentencesFromDocument(string);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should remove specific punctuation at the END OR BEGINING of string/sentence', () => {
    let string = "((This is a well-thought-out string). It has two sentences: not one, but two sentences. No - wait! Make that 3 sentences; -or is it 4 sentences and a question,?)";
    let expectedResult = ["This is a well-thought-out string", "It has two sentences not one but two sentences", "No wait", "Make that 3 sentences", "or is it 4 sentences and a question"];

    let myDictionary = new PhrasesDictionary();
    let actualResult = myDictionary.getSentencesFromDocument(string);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });
});

describe('Loop over sentence array', () => {
  it('should loop over array of sentences and check each sentance for phrases', () => {
    let sentenceArray = expectedPhraseArrays.sentenceArray;
    let expectedResult = expectedPhraseArrays.arrayOfPhrasesArray;

    let myDictionary = new PhrasesDictionary();
    console.log("LoopTest", sentenceArray, myDictionary.getPhrasesFromSentences(sentenceArray))
    let actualResult = myDictionary.getPhrasesFromSentences(sentenceArray);

    expect(expectedResult).to.deep.equal(actualResult);
  })
})

describe('Check sentence for pharases', () => {
  it('should return undefined if given an empty or undefined string', () => {
    let string = "";
    let string2;

    let myDictionary = new PhrasesDictionary();
    let actualResult = myDictionary.checkSentenceForPhrases(string, 3);
    let actualResult2 = myDictionary.checkSentenceForPhrases(string2, 3);

    expect(actualResult).to.be.undefined;
    expect(actualResult2).to.be.undefined;
  });

  it('should return an empty array if given a phraseLength less than 0 or greater than number of words', () => {
    let string = "It has two well-thought-out sentences not one but two well-thought-out sentences";

    let myDictionary = new PhrasesDictionary();
    let actualResult = myDictionary.checkSentenceForPhrases(string, -1);
    let actualResult2 = myDictionary.checkSentenceForPhrases(string, 100);

    expect(actualResult).to.be.undefined;
    expect(actualResult2).to.be.undefined;
  });

  it('should return the sentence as an array if given a phraseLength equal to number of words', () => {
    let string = "It has two well-thought-out sentences not one but two sentences";
    let expectedResult = ["It has two well-thought-out sentences not one but two sentences"];

    let myDictionary = new PhrasesDictionary();
    let actualResult = myDictionary.checkSentenceForPhrases(string, 10);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should separate a sentence into phrases based on any phraseLength', () => {
    let string = "It has two well-thought-out sentences not one but two well-thought-out sentences";
    let myDictionary = new PhrasesDictionary();

    for(let i = 3; i <= 10; i++){
      let expectedResult = expectedPhraseArrays[i.toString()];
      let actualResult = myDictionary.checkSentenceForPhrases(string,  i);

      expect(actualResult).to.be.an('array');
      expect(expectedResult).to.deep.equal(actualResult);
    }
  });

});

describe('Loop over a phrase array', () => {
  it('should loop over an array of phrases and send them to the dictionary function', () => {
    let arrayOfPhrases = expectedPhraseArrays[3];

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

    let myDictionary = new PhrasesDictionary();
    myDictionary.dictionary = {};
    myDictionary.buildPhraseDictionary(arrayOfPhrases);
    console.log("Dict", myDictionary, "dict", myDictionary.dictionary)

    expect(myDictionary.dictionary).to.deep.equal(expectedDictionary);
  })
});

describe('Adding a phrase to a dictionary', () => {
  it('should NOT add an empty string if given an empty string', () => {
    let phrase = "";
    let phrase2;
    let expectedDictionary = {};

    
    let myDictionary = new PhrasesDictionary();
    myDictionary.dictionary = {};

    myDictionary.addPhraseToDictionary(phrase);
    myDictionary.addPhraseToDictionary(phrase2);

    expect(myDictionary.dictionary).to.deep.equal(expectedDictionary);
  });

  it('should check phrase and either add or increase count in dictionary', () => {
    let phraseArr = ["It has two", "has two well-thought-out", "two well-thought-out sentences", "well-thought-out sentences not", "sentences not one", "not one but", "one but two", "but two well-thought-out", "two well-thought-out sentences"];
    let phraseArr2 = expectedPhraseArrays[9];

    let expectedDictionary = {
      "it has two": 1,
      "has two well-thought-out": 1, 
      "two well-thought-out sentences": 2, 
      "well-thought-out sentences not": 1, 
      "sentences not one": 1, 
      "not one but": 1, 
      "one but two": 1, 
      "but two well-thought-out": 1,
      "it has two well-thought-out sentences not one but two": 1,
      "has two well-thought-out sentences not one but two well-thought-out": 1, 
      "two well-thought-out sentences not one but two well-thought-out sentences" : 1
    }

    let myDictionary = new PhrasesDictionary();
    myDictionary.dictionary = {};

    phraseArr.forEach(function(phrase) {
      myDictionary.addPhraseToDictionary(phrase);
    });
    phraseArr2.forEach(function(phrase) {
      myDictionary.addPhraseToDictionary(phrase);
    });

    expect(myDictionary.dictionary).to.deep.equal(expectedDictionary);
  });

  it('should be case insensitive', () => {
    let phraseCapitalized = "It Has Two";
    let phraseLower = "it has two";
    let expectedDictionary = {
      "it has two": 2
    }

    let myDictionary = new PhrasesDictionary();
    myDictionary.dictionary = {};

    myDictionary.addPhraseToDictionary(phraseCapitalized);
    myDictionary.addPhraseToDictionary(phraseLower);

    expect(myDictionary.dictionary).to.deep.equal(expectedDictionary);
  });
});