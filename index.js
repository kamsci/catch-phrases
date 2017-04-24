// Given a string representing a document, write a function which returns the top 10 most frequent repeated phrases. A phrase is a stretch of three to ten consecutive words and cannot span sentences. Only include a phrase if it is not a subset of another, longer phrase (if “calm cool” and “calm cool and collected” are repeated, do not include “calm cool” in the returned set).


/* 
  Assumptions:
  - Document content is limited to alphanumeric and basic punctuation; no urls, emails, line breaks, html, etc.
  - Sentences defined by ending in one of:
    - period
    - explanation point
    - question mark
    - semi-colon
  - Phrases are not dependent on punctiation. ie. "calm cool" is the same as "calm, cool"
    - Punctuation removed: 
      - comma
      - parenthesis
      - colon
      - dash (not hyphenated word) 
  - Hyphenated words are counted as 1 word. ie. "state-of-the-art"

*/

// Part 1 - Find Phrases and add to dictionary
var dictionary = {};

/*
  Split document string into an array of sentences with punctuation removed, except for hyphens in hyphenated words
*/
stringToSentenceArray = (string) => {
  if(string === undefined) { return []; }

  string = string.replace(/:|,|\(|\)|\s-|-\s/g, "");

  // split string into array on sentence ending punctuation, (! . ; ?)
  let array = string.split(/!\s*|;\s*|\?\s*|\.\s*/g);
  if(array[array.length - 1].length === 0) {
    array.pop();
  };

  return array;
};

/* 
  Take sentence and phraseLength variable and break into array of phrases as long as phraseLength
*/
checkSentenceForPhrases = (string, phraseLength) => {
  if(string === undefined || phraseLength < 0) { return []; }

  let wordArr = string.split(" ");
  let arrayOfPhrases = [];

  for(var i = 0; i < wordArr.length; i++) {
    let phraseArr = [];
    for(var k = i; k < wordArr.length; k++) {
      if(phraseArr.length < phraseLength){
        phraseArr.push(wordArr[k]);
      };
    };
    if(phraseArr.length === phraseLength) {
      let phrase = phraseArr.join (" ");
      arrayOfPhrases.push(phrase);
    };
  };

  return arrayOfPhrases;
};

/* 
  Take array of phrases and add or increase count in dictionary
*/
addPhraseToDictionary = (dictionary, phrase) => {
  if(phrase === "" || phrase === undefined) { return; }
  phrase = phrase.toLowerCase();
  if(dictionary.hasOwnProperty(phrase)){
    dictionary[phrase] += 1;
  } else {
    dictionary[phrase] = 1;
  };
};

// Part 2 - Find Top 10
// Option 1: Find highest 10 after counting
// Option 2: Create highest 10 obj and compare as you go... 


module.exports = { 
  stringToSentenceArray, 
  checkSentenceForPhrases,
  addPhraseToDictionary,
  dictionary 
};
