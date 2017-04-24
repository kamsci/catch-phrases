/* 
  Assumptions:
  - The priority with phrases that have the same length is unknown
    - Therefore, in order to preserve data, if there is a tie in top ten counts, all phrases in the tied count will be returned
    - Yes, this means >10 phrases can be returned
*/

class TopPhrases {
  constructor(int){
    this.maxPhraseCounts = int ? int : 10;
    this.totalPhrases = 0;
    this.phrases = {};
  }

  checkToAddPhrase(phrase, count) {
    if(phrase === "" || phrase === undefined
      || count < 1 || count === undefined) {
        return false;
      }
    
    // If phrases object has not reached max count capacity, add new phrase without checking existing counts
    if(this.maxPhraseCounts > Object.keys(this.phrases).length) {
      if(this.phrases.hasOwnProperty(count)) {
        this.phrases[count].push(phrase);
      } else {
        this.phrases[count] = [phrase];
      }
      this.totalPhrases++;
      return true;
    }
      
    let updated = false;

    return updated;
  }

  replacePhrase(phrase, count) {

  }
};

module.exports = TopPhrases;