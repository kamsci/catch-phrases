var expect = require('chai').expect;
var TopTenPhrases = require("../index.js");

// Given a string representing a document, write a function which returns the top 10 most frequent repeated phrases. A phrase is a stretch of three to ten consecutive words and cannot span sentences. Only include a phrase if it is not a subset of another, longer phrase (if “calm cool” and “calm cool and collected” are repeated, do not include “calm cool” in the returned set).

// Part 1 - Find Phrases and store in dictionary
describe('find phrases and store in dictionary', () => {
  it('should separate a string into an array of sentences on (. ! ? ;) with punctuation removed; return an array', () => {

    let string = "This is a string. It has two sentences, not one, but two sentences (although short). No - wait! Make that 3 sentences; or is it 4 sentences and a question?";
    let expectedResult = ["This is a string", "It has two sentences not one but two sentences although short", "No wait", "Make that 3 sentences", "or is it 4 sentences and a question"];

    let actualResult = TopTenPhrases.stringToSentenceArray(string);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should separate a sentence into phrases and return an array of phrases', () => {
    let string = "It has two short sentences not one but two short sentences";
    let expectedResult = ["It has two", "has two short", "two short sentences", "short sentences not", "sentences not one", "not one but", "one but two", "but two short", "two short sentences"];

    let actualResult = TopTenPhrases.checkSentenceForPhrases(string,  3);

    expect(actualResult).to.be.an('array');
    expect(expectedResult).to.deep.equal(actualResult);
  });

  it('should check phrase and either add or increase count in dictionary', () => {
    let phraseArr = ["It has two", "has two short", "two short sentences", "short sentences not", "sentences not one", "not one but", "one but two", "but two short", "two short sentences"];
    let expectedDictionary = {
      "It has two": 1,
      "has two short": 1, 
      "two short sentences": 2, 
      "short sentences not": 1, 
      "sentences not one": 1, 
      "not one but": 1, 
      "one but two": 1, 
      "but two short": 1
    }

    let actualDictionary = {};
    phraseArr.forEach(function(phrase) {
      TopTenPhrases.addPhraseToDictionary(actualDictionary, phrase);
    }); 

    console.log("Dictionary", actualDictionary);

    expect(actualDictionary).to.deep.equal(expectedDictionary);
  });

// F: Take sentence and phrase length variable
    // Check dictionary if phrase exists
      // Does not exist => add as key with value count of 1
      // Exists => increase count  
});