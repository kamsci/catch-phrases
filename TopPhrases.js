class TopPhrases {
  constructor(phraseObj, numberOfPhrases) {
    this.phraseObj = phraseObj ? phraseObj : {};
    this.numberOfPhrases = numberOfPhrases ? numberOfPhrases : 10;
    this.sortedPhraseArray;
    this.topPhrasesArray;

    this.determineTopPhrases();
  }

  determineTopPhrases() {
    this.sortedPhraseArray = this.turnPhraseObjIntoSortedArray();
    let topPhrasesArray = this.getTopTenArrayOfPhrases(this.sortedPhraseArray);

    this.topPhrasesArray = topPhrasesArray;
  }

  turnPhraseObjIntoSortedArray() {
    if(this.phraseObj === undefined || this.phraseObj === {}) { return; }
    
    let sortedPhraseArray = [];
    for(var phrase in this.phraseObj) {
      sortedPhraseArray.push([phrase, this.phraseObj[phrase]]);
    }
    sortedPhraseArray.sort(function(a, b) {
      return b[1] - a[1];
    });
    return sortedPhraseArray;
  }

  getTopTenArrayOfPhrases(sortedPhraseArray) {
    if(sortedPhraseArray === undefined || sortedPhraseArray.length === 0) { return; }
    // console.log("SortedInside", sortedPhraseArray)
    let topPhrases = [];
    for(var i = 0; i < this.numberOfPhrases; i++) {
      if(i > sortedPhraseArray.length -1) { return; }
      topPhrases.push(sortedPhraseArray[i]);
    }
    // console.log("Before topPhrases", topPhrases)
    let newTopPhrases = this.removeSubsets(topPhrases);
    // console.log("New length", newTopPhrases.length);
    // TODO: Repeat get phrases to add up to 10
    return newTopPhrases;
  }

  removeSubsets(topPhrases) {
    if(topPhrases === undefined || topPhrases.length === 0) { return; }
    if(topPhrases.length === 1) { return topPhrases; }

    for(var k = 0; k < topPhrases.length; k++) {
      let outerPhrase = topPhrases[k][0];
      console.log("Outer", outerPhrase)
      for(var j = 0; j < topPhrases.length; j++) {
        let innerPhrase = topPhrases[j][0];
        console.log("  Inner", innerPhrase)
        if(outerPhrase !== innerPhrase) {
          let isSubstring = outerPhrase.includes(innerPhrase);
          console.log("  ", isSubstring)
          if(isSubstring) {
            topPhrases.splice(j, 1);
            j--;
            console.log("  AfterSplice",j , topPhrases)
          }
        }
      }
    }
    console.log("After topPhrases", topPhrases)
    return topPhrases;
  }
}

module.exports = TopPhrases;