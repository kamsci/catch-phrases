class TopPhrases {
  /*
    Main function to call and get top list of phrases and counts
  */
  static determineTopPhrases(phraseObj, numberOfPhrases) {
    let sortedPhraseArray = this.turnPhraseObjIntoSortedArray(phraseObj);
    // console.log("sortedPhraseArray", sortedPhraseArray)
    let sortedPhrasesSubsetsRemoved = this.checkAndRemoveSubsets(sortedPhraseArray)
    console.log("sortedPhrasesSubsetsRemoved", sortedPhrasesSubsetsRemoved)
    let topPhrasesArray = this.getTopArrayOfPhrases(sortedPhrasesSubsetsRemoved, numberOfPhrases);
    console.log("topPhrasesArray", topPhrasesArray)

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
    Loop over sorted array of phrases and pull top ten that are not subsets of each other
  */
  static getTopArrayOfPhrases(sortedPhrasesSubsetsRemoved, numberOfPhrases) {
    if (sortedPhrasesSubsetsRemoved === undefined || sortedPhrasesSubsetsRemoved.length === 0) { return; }

    let topPhrasesArray = [];
    for (var i = 0; i < numberOfPhrases; i++) {
      if (i > sortedPhrasesSubsetsRemoved.length - 1) { return; }

      topPhrasesArray.push(sortedPhrasesSubsetsRemoved[i]);
      // console.log(sortedPhrasesSubsetsRemoved[i][0], "AddToTP", topPhrasesArray);
    }
    // console.log("After topPhrases", topPhrasesArray)
    return topPhrasesArray;
  }
  /*
    Return false - phrase not added - if new phrase exists as a subset of any phrases in the existing topPhraseArray
    Return true if one or more existing phrases are a subset of the new phrase; Remove subsets
  */
  static checkAndRemoveSubsets(sortedPhraseArray) {
    if (sortedPhraseArray === undefined || sortedPhraseArray.length === 0) { return; }

    console.log("Original, length", sortedPhraseArray.length, sortedPhraseArray)
    for (var i = 0; i < sortedPhraseArray.length; i++) {
      let outerPhrase = sortedPhraseArray[i][0];
      console.log("Outer", i, outerPhrase)
      for (var k = 0; k < sortedPhraseArray.length; k++) {
        let innerPhrase = sortedPhraseArray[k][0];
        if (outerPhrase !== innerPhrase) {
          // console.log("  Inner", innerPhrase)
          let isSubset = outerPhrase.match(innerPhrase);
          // console.log("  ", outerPhrase.includes(innerPhrase))
          if (isSubset) {
            // console.log("Outer", outerPhrase)
            console.log("  Index", k, i)
            sortedPhraseArray.splice(k, 1);
            if (k > 0) { k--; };
            if (i > k) { i--; }
            console.log("K After", k)
            // if (k === i) { i--; }
            // console.log("  AfterSplice", k, sortedPhraseArray)
          }
        }
      }
    }
    // console.log("Removed", sortedPhraseArray);
    return sortedPhraseArray;
  }

  // removeSubsets(topPhrases) {
  //   if (topPhrases === undefined || topPhrases.length === 0) { return; }
  //   if (topPhrases.length === 1) { return topPhrases; }

  //   for (var i = 0; i < topPhrases.length; i++) {
  //     let outerPhrase = topPhrases[i][0];
  //     // console.log("Outer", outerPhrase)
  //     for (var k = 0; k < topPhrases.length; k++) {
  //       let innerPhrase = topPhrases[k][0];
  //       // console.log("  Inner", innerPhrase)
  //       if (outerPhrase !== innerPhrase) {
  //         let isSubstring = outerPhrase.includes(innerPhrase);
  //         // console.log("  ", isSubstring)
  //         if (isSubstring) {
  //           topPhrases.splice(k, 1);
  //           k--;
  //           // console.log("  AfterSplice",j , topPhrases)
  //         }
  //       }
  //     }
  //   }

  //   return topPhrases;
  // }
  /*
    Check and remove subset from entire phrase object
  */
  // removeSubsetsEntireArray(sortedPhraseArray) {
  //   if (sortedPhraseArray === undefined || sortedPhraseArray.length === 0) { return; }

  //   for (var i = 0; i < sortedPhraseArray.length; i++) {
  //     if (this.checkAndRemoveSubsets(sortedPhraseArray[i][0]) === true) {
  //       console.log("Check True");
  //       this.sortedPhrasesSubsetsRemoved.push(sortedPhraseArray[i]);
  //       console.log(sortedPhraseArray[i][0], "AddToSP", this.topPhrasortedPhrasesSubsetsRemovedsesArray);
  //     }
  //   }
  // }


}

module.exports = TopPhrases;