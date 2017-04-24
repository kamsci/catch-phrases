/* 
  Assumptions:
  - Does not hanlde ties for now
  - Removes first phrase with lower number, 
    ie. if two phrases have a count of 3 and the new phrase has a count of 4, new phrase will replace first
*/

class TopPhrases {
  constructor(int){
    this.maxTrackedPhrases = int ? int : 10;
    this.phrases = [];
  }

  checkToAddPhrase(phrase, count) {
    if(phrase === "" || phrase === undefined
      || count < 1 || count === undefined) {
        return false;
      }
    
    let phrasesObj = {};
    phrasesObj[phrase] = count;


    if(this.maxTrackedPhrases > this.phrases.length) {
      this.phrases.push(phrasesObj);
      return true;
    }

    let updated = false;

    return updated;
  }
};

module.exports = TopPhrases;

    // for(var p in this.phrases) {
    //   console.log("P:", p, this.phrases[p])
    //   if(count < this.phrases[p]) {
    //     newPhrasesState[p] = this.phrases[p];
    //     console.log("Stay", newPhrasesState)
    //   } 
    //   if(count > this.phrases[p]) {
    //     newPhrasesState[phrase] = count;
    //     updated = true;
    //     console.log("Change", newPhrasesState)
    //     break;
    //   }
    // }