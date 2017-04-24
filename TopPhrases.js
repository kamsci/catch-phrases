class TopPhrases {
  constructor(phraseObj){
    this.phraseObj = phraseObj;
    this.topPhrasesObj;

    this.determineTopPhrases();
  }

  determineTopPhrases() {
    let sortedCountArray = this.turnPhraseObjIntoSortedArray();
    let topCountsArray = this.getHighestCountsArray(sortedCountArray);
    let topPhrasesObj = this.getTopTenArrayOfPhrases(topCountsArray);

    this.topPhrasesObj = topPhrasesObj;
  }

  turnPhraseObjIntoSortedArray() {
    let countArray = [];
    for(var phrase in this.phraseObj){
      let count = this.phraseObj[phrase];
      countArray.push(count);
    }
    let sortedCountArray = countArray.sort();
    return sortedCountArray;
  }
  
  getHighestCountsArray(sortedCountArray) {
    let topCountsArray = [];
    let idx = sortedCountArray.length - 1;

    while(topCountsArray.length < 10 && idx >= 0) {
      if(sortedCountArray[idx] === sortedCountArray[idx - 1]) {
        idx--;
      } else {
        topCountsArray.push(sortedCountArray[idx]);
        idx--;
      }
    }
    return topCountsArray;
  }

  getTopTenArrayOfPhrases(topCountsArray) {
    let topPhrases = [];
    for(var i = 0; i < topCountsArray.length; i++) {
      if(topPhrases.length < 10) {
        for(var phrase in this.phraseObj){
          if(this.phraseObj[phrase] === topCountsArray[i]){
            topPhrases.push([phrase, this.phraseObj[phrase]]);
          }
        }
      }
    }
    // console.log("Before topPhrases", topPhrases)
    let newTopPhrases = this.removeSubsets(topPhrases);
    // console.log("New length", newTopPhrases.length);
    // TODO: Repeat get phrases to add up to 10
    return newTopPhrases;
  }

  removeSubsets(topPhrases) {
    for(var k = 0; k < topPhrases.length; k++) {
      let outerPhrase = topPhrases[k][0];
      for(var j = 0; j < topPhrases.length; j++) {
        let innerPhrase = topPhrases[j][0];
        if(outerPhrase !== innerPhrase) {
          let isSubstring = outerPhrase.includes(innerPhrase);
          if(isSubstring) {
            topPhrases.splice(j, 1);
          }
        }
      }
    }
    // console.log("After topPhrases", topPhrases)
    return topPhrases;
  }
}

module.exports = TopPhrases;