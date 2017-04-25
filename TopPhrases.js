class TopPhrases {
  /*
    Main function to call and get top list of phrases and counts
  */
  static determineTopPhrases(phraseObj, numberOfPhrases) {
    let sortedPhraseArray = this.turnPhraseObjIntoSortedArray(phraseObj);
    let sortedPhrasesSubsetsRemoved = this.checkAndRemoveSubsets(sortedPhraseArray)
    let topPhrasesArray = this.getTopArrayOfPhrases(sortedPhrasesSubsetsRemoved, numberOfPhrases);

    return topPhrasesArray;
  }

  /*
    Turn the phraseObject into an Array sorted by count desc
  */
  static turnPhraseObjIntoSortedArray(phraseObj) {
    if (phraseObj === undefined || Object.keys(phraseObj).length === 0) { return; }

    let sortedPhraseArray = [];
    for (var phrase in phraseObj) {
      sortedPhraseArray.push([phrase, phraseObj[phrase]]);
    }
    sortedPhraseArray.sort(function (a, b) {
      return b[1] - a[1];
    });

    return sortedPhraseArray;
  }

  /*
    Take sortedPhraseArray - with subsets removed- and return top number of phrases
  */
  static getTopArrayOfPhrases(sortedPhrasesSubsetsRemoved, numberOfPhrases) {
    if (sortedPhrasesSubsetsRemoved === undefined || sortedPhrasesSubsetsRemoved.length === 0) { return; }

    let topPhrasesArray = [];
    for (var i = 0; i < numberOfPhrases; i++) {
      if (i > sortedPhrasesSubsetsRemoved.length - 1) { return; }

      topPhrasesArray.push(sortedPhrasesSubsetsRemoved[i]);

    }
    return topPhrasesArray;
  }

  /*
    Remove all subsets of each other from phrase array
  */
  static checkAndRemoveSubsets(sortedPhraseArray) {
    if (sortedPhraseArray === undefined || sortedPhraseArray.length === 0) { return; }

    for (var i = 0; i < sortedPhraseArray.length; i++) {
      let outerPhrase = sortedPhraseArray[i][0];
      for (var k = 0; k < sortedPhraseArray.length; k++) {
        let innerPhrase = sortedPhraseArray[k][0];
        if (outerPhrase !== innerPhrase) {
          let isSubset = outerPhrase.match(innerPhrase);
          if (isSubset) {
            sortedPhraseArray.splice(k, 1);
            if (k > 0) { k--; };
            if (i > k) { i--; }
          }
        }
      }
    }
    return sortedPhraseArray;
  }
}

module.exports = TopPhrases;