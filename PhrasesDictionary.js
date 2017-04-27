var TopPhrases = require('./TopPhrases.js');
var myDocument = require('./document.json');

class PhrasesDictionary {
  constructor(content, minPhraseCount, maxPhraseCount) {
    this.phraseObj = {};
    this.minPhraseCount = minPhraseCount ? minPhraseCount : 3;
    this.maxPhraseCount = maxPhraseCount ? maxPhraseCount : 10;
    this.topTenPhrases;
    this.topTenPhrasesNoSingles;

    this.getTopPhrases(content);
  }

  /*
    Kick off funtions to get top ten phrases
  */
  getTopPhrases(content) {
    // Part 1 - Find Phrases and add to dictionary
    let sentenceArray = this.getSentencesFromDocument(content);
    let allPhrasesArray = this.getPhrasesFromSentences(sentenceArray);
    this.buildPhraseDictionary(allPhrasesArray);

    // Part 2 - Find Top 10 including singles and top 10 excluding singles
    this.topTenPhrases = TopPhrases.determineTopPhrases(this.phraseObj, 10, true);
    this.topTenPhrasesNoSingles = TopPhrases.determineTopPhrases(this.phraseObj, 10, false);
  }

  /*
    Split document string into an array of sentences with punctuation removed, except for hyphens in hyphenated words
  */
  getSentencesFromDocument(string) {
    if (string === undefined || string === "") { return; }

    string = string.replace(/:|,|\(|\)|\s-|-\s/g, "");

    // split string into array on sentence ending punctuation, (! . ; ?)
    let sentenceArray = string.split(/!\s*|;\s*|\?\s*|\.\s*/g);
    if (sentenceArray[sentenceArray.length - 1].length === 0) {
      sentenceArray.pop();
    };

    return sentenceArray;
  };

  /*
    Loop over each sentence to set all possible phrases then add to allPhrasesArray
  */
  getPhrasesFromSentences(sentenceArray) {
    if (sentenceArray === undefined || sentenceArray.length === 0) { return; }

    let phraseLength = this.minPhraseCount;
    let allPhrasesArray = [];

    while (phraseLength <= this.maxPhraseCount) {
      for (var i = 0; i < sentenceArray.length; i++) {
        let sentencePhraseArray = this.checkSentenceForPhrases(sentenceArray[i], phraseLength);
        if (sentencePhraseArray !== undefined && sentencePhraseArray.length > 0) {
          allPhrasesArray = allPhrasesArray.concat(sentencePhraseArray);
        }
      }
      phraseLength++;
    }
    return allPhrasesArray;
  }

  /* 
    Take sentence and phraseLength variable and break into array of phrases as long as phraseLength
  */
  checkSentenceForPhrases(string, phraseLength) {
    if (string === undefined || string === "" || phraseLength <= 0) { return; }

    let wordArr = string.split(" ");
    if (wordArr.length < phraseLength) { return; }

    let arrayOfPhrases = [];

    for (var i = 0; i < wordArr.length; i++) {
      let phraseArr = [];
      for (var k = i; k < wordArr.length; k++) {
        if (phraseArr.length < phraseLength) {
          phraseArr.push(wordArr[k]);
        };
      };
      if (phraseArr.length === phraseLength) {
        let phrase = phraseArr.join(" ");
        arrayOfPhrases.push(phrase);
      };
    };
    return arrayOfPhrases;
  };

  /* 
    Take array of phrases and performs AddToDictionary on each
  */
  buildPhraseDictionary(allPhrasesArray) {
    if (allPhrasesArray === undefined || allPhrasesArray.length === 0) { return; }

    for (var i = 0; i < allPhrasesArray.length; i++) {
      this.addPhraseToDictionary(allPhrasesArray[i]);
    }
  }

  /* 
    Take phrase and add or increase count in dictionary
  */
  addPhraseToDictionary(phrase) {
    if (phrase === undefined || phrase === "") { return; }

    phrase = phrase.toLowerCase();
    if (this.phraseObj.hasOwnProperty(phrase)) {
      this.phraseObj[phrase] += 1;
    } else {
      this.phraseObj[phrase] = 1;
    };
  };
}

module.exports = PhrasesDictionary;
