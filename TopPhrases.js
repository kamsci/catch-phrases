class TopPhrases {
  constructor(phraseObj, numberOfPhrases) {
    this.phraseObj = phraseObj ? phraseObj : {};
    this.numberOfPhrases = numberOfPhrases ? numberOfPhrases : 10;
    this.topPhrasesArray = [];
    this.sortedPhraseArray;

    this.determineTopPhrases();
  }
  /*
    Kick off
  */
  determineTopPhrases() {
    this.sortedPhraseArray = this.turnPhraseObjIntoSortedArray();
    this.getTopArrayOfPhrases(this.sortedPhraseArray);
  }
  /*
    Turn the phraseObject into an Array sorted by count desc
  */
  turnPhraseObjIntoSortedArray() {
    if (this.phraseObj === undefined || Object.keys(this.phraseObj).length === 0) { return; }

    let sortedPhraseArray = [];
    for (var phrase in this.phraseObj) {
      sortedPhraseArray.push([phrase, this.phraseObj[phrase]]);
    }
    sortedPhraseArray.sort(function (a, b) {
      return b[1] - a[1];
    });
    return sortedPhraseArray;
  }
  /*
    Loop over sorted array of phrases and pull top ten that are not subsets of each other
  */
  getTopArrayOfPhrases(sortedPhraseArray) {
    if (sortedPhraseArray === undefined || sortedPhraseArray.length === 0) { return; }

    // this.topPhrasesArray = [];
    for (var i = 0; i < this.numberOfPhrases; i++) {
      if (i > sortedPhraseArray.length - 1) { return; }
      console.log("Phrase", sortedPhraseArray[i][0], typeof sortedPhraseArray[i][0] !== 'string')
      if (this.checkAndRemoveSubsets(sortedPhraseArray[i][0]) === true) {
        console.log("Check True");
        this.topPhrasesArray.push(sortedPhraseArray[i]);
        console.log(sortedPhraseArray[i][0], "AddToTP", this.topPhrasesArray);
      }

    }
    let word = "when they walk through"
    console.log("Word Includes", word.includes("when they walk"));
    console.log("After topPhrases", this.topPhrasesArray)
  }
  /*
    Return false - phrase not added - if new phrase exists as a subset of any phrases in the existing topPhraseArray
    Return true if one or more existing phrases are a subset of the new phrase; Remove subsets
  */
  checkAndRemoveSubsets(newPhrase) {
    if (newPhrase === undefined || this.topPhrasesArray === undefined || newPhrase === "" || typeof newPhrase !== 'string') {
      return;
    }

    for (var i = 0; i < this.topPhrasesArray.length; i++) {
      if (this.topPhrasesArray[i] !== newPhrase) {

        // Do not add if newPhrase is a subset of an existing phrase
        let phraseIsSubset = this.topPhrasesArray[i][0].includes(newPhrase);
        console.log("Phrase is subset", phraseIsSubset)
        if (phraseIsSubset === true) { return false; }

        // Remove phrase if it is a subset of newPhrase
        let existingSubset = newPhrase.includes(this.topPhrasesArray[i]);
        if (existingSubset === true) {
          this.topPhrasesArray.splice(i, 1)
          i--;
        }
      }
    }
    return true;
  }

  // removeSubsets(topPhrases) {
  //   if (topPhrases === undefined || topPhrases.length === 0) { return; }
  //   if (topPhrases.length === 1) { return topPhrases; }

  //   for (var k = 0; k < topPhrases.length; k++) {
  //     let outerPhrase = topPhrases[k][0];
  //     // console.log("Outer", outerPhrase)
  //     for (var j = 0; j < topPhrases.length; j++) {
  //       let innerPhrase = topPhrases[j][0];
  //       // console.log("  Inner", innerPhrase)
  //       if (outerPhrase !== innerPhrase) {
  //         let isSubstring = outerPhrase.includes(innerPhrase);
  //         // console.log("  ", isSubstring)
  //         if (isSubstring) {
  //           topPhrases.splice(j, 1);
  //           j--;
  //           // console.log("  AfterSplice",j , topPhrases)
  //         }
  //       }
  //     }
  //   }

  //   return topPhrases;
  // }
}

module.exports = TopPhrases;