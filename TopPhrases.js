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
    if (sortedPhrasesSubsetsRemoved === undefined || sortedPhrasesSubsetsRemoved.length === 0 || numberOfPhrases === undefined) { return; }

    let topPhrasesArray = [];
    for (var i = 0; i < sortedPhrasesSubsetsRemoved.length; i++) {
      if (topPhrasesArray.length >= numberOfPhrases) { break; }

      topPhrasesArray.push(sortedPhrasesSubsetsRemoved[i]);

      while (i < sortedPhrasesSubsetsRemoved.length - 1 && sortedPhrasesSubsetsRemoved[i][1] === sortedPhrasesSubsetsRemoved[i + 1][1]) {
        topPhrasesArray.push(sortedPhrasesSubsetsRemoved[i + 1]);
        i++;
      }
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
          console.log(i, sortedPhraseArray[i][0], k, sortedPhraseArray[k][0]);
          if (isSubset) {
            // console.log(i, k)
            sortedPhraseArray.splice(k, 1);
            if (k >= 0) { k--; };
            if (i > k) { i--; }
            console.log(" sorted", sortedPhraseArray)
            console.log("-----------------------------------")
          }
        }
      }
    }
    return sortedPhraseArray;
  }
}

module.exports = TopPhrases;