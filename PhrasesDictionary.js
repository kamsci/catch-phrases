var myDocument = require('./document.json');

class PhrasesDictionary {
  constructor(content) {
    this.dictionary = {};

    this.calculateTopFunctions(content);
  }

  /*
    Calculate
  */
  calculateTopFunctions(content) {
    // Part 1 - Find Phrases and add to dictionary
    let sentenceArray = this.stringToSentenceArray(content);
    // console.log("sentenceArr", sentenceArray);
    let arrayOfPhraeArrays = this.loopOverSentenceArray(sentenceArray);
    // console.log("arrayOfPA", arrayOfPhraeArrays);
    this.loopOverPhraseArray(arrayOfPhraeArrays);
    console.log("Dict", this.dictionary);

    // Part 2 - Find Top 10 
  }

  /*
    Split document string into an array of sentences with punctuation removed, except for hyphens in hyphenated words
  */
  stringToSentenceArray(string) {
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
  checkSentenceForPhrases(string, phraseLength) {
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
    Take array of phrases and performs AddToDictionary on each
  */
  loopOverPhraseArray(arrayOfPhrasesArray) {
    for(var i = 0; i < arrayOfPhrasesArray.length; i++) {
      console.log("EnterPhrase[i]", arrayOfPhrasesArray[i].length);
      for(var k = 0; k < arrayOfPhrasesArray[i].length; k++) {
        console.log("EnterPhrase[i][k]", arrayOfPhrasesArray[i][k]);
        this.addPhraseToDictionary(arrayOfPhrasesArray[i][k]);
        console.log("PhraseLoopArray" + i, arrayOfPhrasesArray[i])
      }
    }
  }

  loopOverSentenceArray(sentenceArray) {
    let phraseLength = 3;
    let arrayOfPhrasesArrays = [];
    while(phraseLength <= 10) {
      for(var i = 0; i < sentenceArray.length; i++) {
        let arrayOfPhrases = this.checkSentenceForPhrases(sentenceArray[i], phraseLength);
        arrayOfPhrasesArrays.push(arrayOfPhrases);
      }
      phraseLength++;
    }
    // console.log("ArrayOfPhrasesArray", arrayOfPhrasesArrays);
    return arrayOfPhrasesArrays;
  }
  /* 
    Take phrase and add or increase count in dictionary
  */
  addPhraseToDictionary(phrase) {
    if(phrase === "" || phrase === undefined) { return; }

    phrase = phrase.toLowerCase();
    if(this.dictionary.hasOwnProperty(phrase)){
      this.dictionary[phrase] += 1;
    } else {
      this.dictionary[phrase] = 1;
    };
  };
}


module.exports = PhrasesDictionary;
