var myDocument = require('./document.json');

class PhrasesDictionary {
  constructor(content, minPhraseCount, maxPhraseCount) {
    this.dictionary = {};
    this.minPhraseCount = minPhraseCount ? minPhraseCount : 3;
    this.maxPhraseCount = maxPhraseCount ? maxPhraseCount : 10;

    this.calculateTopPhrases(content);
  }

  /*
    Calculate
  */
  calculateTopPhrases(content) {
    // Part 1 - Find Phrases and add to dictionary
    let sentenceArray = this.getSentencesFromDocument(content);
    //console.log("sentenceArr", sentenceArray);
    let allPhrasesArray = this.getPhrasesFromSentences(sentenceArray);
    //console.log("phraseArray", phraseArray);
    this.buildPhraseDictionary(allPhrasesArray);
    //console.log("Dict", this.dictionary);

    var dictArray = Array.from(this.dictionary);
    console.log(dictArray);

    // Part 2 - Find Top 10 
    let countArray = [];
    for(var phrase in this.dictionary){
      let count = this.dictionary[phrase];
      countArray.push(count);
    }
    countArray = countArray.sort();
    // console.log("Count", countArray[countArray.length-1]);
    let TopCountArray = [];
    for(var i = countArray[countArray.length - 1]; i > countArray.length - 11; i-- ) {
      // console.log("CountArr", countArray[i]);
      // for(var p in this.dictionary) {
      //   if(this.dictionary[p] )
      // }
    }
    

  }

  /*
    Split document string into an array of sentences with punctuation removed, except for hyphens in hyphenated words
  */
  getSentencesFromDocument(string) {
    if(string === undefined || string === "") { return; }

    string = string.replace(/:|,|\(|\)|\s-|-\s/g, "");

    // split string into array on sentence ending punctuation, (! . ; ?)
    let sentenceArray = string.split(/!\s*|;\s*|\?\s*|\.\s*/g);
    if(sentenceArray[sentenceArray.length - 1].length === 0) {
      sentenceArray.pop();
    };

    return sentenceArray;
  };

  /*
    Loop over each sentence to set all possible phrases then add to allPhrasesArray
  */
    getPhrasesFromSentences(sentenceArray) {
    if(sentenceArray === undefined || sentenceArray.length === 0) { return; }

    let phraseLength = this.minPhraseCount;
    let allPhrasesArray = [];
    
    while(phraseLength <= this.maxPhraseCount) {
      for(var i = 0; i < sentenceArray.length; i++) {
        let sentencePhraseArray = this.checkSentenceForPhrases(sentenceArray[i], phraseLength);
        if(sentencePhraseArray !== undefined && sentencePhraseArray.length > 0) { 
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
    if(string === undefined || string === "" || phraseLength <= 0) { return; }

    let wordArr = string.split(" ");
    if(wordArr.length < phraseLength) {return; }
    
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
  buildPhraseDictionary(allPhrasesArray) {
    if(allPhrasesArray === undefined || allPhrasesArray.length === 0) { return; }

    for(var i = 0; i < allPhrasesArray.length; i++) {
      // console.log("EnterPhrase[i][k]", allPhrasesArray[i][k]);
      this.addPhraseToDictionary(allPhrasesArray[i]);
      // console.log("PhraseLoopArray" + i, allPhrasesArray[i])
    }
  }

  /* 
    Take phrase and add or increase count in dictionary
  */
  addPhraseToDictionary(phrase) {
    if(phrase === undefined || phrase === "") { return; }

    phrase = phrase.toLowerCase();
    if(this.dictionary.hasOwnProperty(phrase)){
      this.dictionary[phrase] += 1;
    } else {
      this.dictionary[phrase] = 1;
    };
  };
}


module.exports = PhrasesDictionary;
