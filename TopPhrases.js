/* 
  Assumptions:
  - The priority with phrases that have the same length is unknown
    - Therefore, in order to preserve data, if there is a tie in top ten counts, all phrases in the tied count will be returned
    - This means >10 phrases can be returned
  - Currently, this class is only used to add new phrases, not to remove
*/

class TopPhrases {
  constructor(int){
    this.maxPhraseCounts = int ? int : 10;
    this.phrases = {};
  }

  /*
    Add phrase if it should be added, return true if added or false if not
  */
  addedPhrase(phrase, count) {
    if(phrase === "" || phrase === undefined
      || count < 1 || count === undefined) {
        return false;
      }
      console.log("Count", count)
    let didUpdate = false;
    // Quantity of phrases count has not reached maxPhraseCounts
    if(this.maxPhraseCounts > Object.keys(this.phrases).length) {
      // If count already exist, add phrase to array, if not add new key
      if(this.phrases.hasOwnProperty(count)) {
        this.phrases[count].push(phrase);
      } else {
        this.phrases[count] = [phrase];
      }
      didUpdate = true;
    }
    // Quantity of phrases has reached maxPhraseCounts, replace a key if count > minimum key
    else {
      didUpdate = this.tryReplacePhrase(phrase, count);
    }
    console.log("CheckDidUpdate", didUpdate);
    console.log("newTop", this)
    console.log("---------------------------");
    return didUpdate;
  }

  /*
    HELPER: Add phrase if count > min, return true if added or false if not
  */
  tryReplacePhrase(phrase, count) {
    let updated = false;
    let min = this.findMinCount();
    console.log("count vs min: ", count, min, count <  min);

    // Return without updating if count is less than current min
    if (count <  min) { return updated; }

    let newPhraseState = {};

    // Create newPhraseState to replace this.phrases
    for(var countKey in this.phrases) {
      // Find minimum key and replace with new key,value (count, phrase)
      if(countKey === min) {
        newPhraseState[count] = [phrase];
        updated = true;   
      } 
      else {
        newPhraseState[countKey] = this.phrases[countKey];
      }
    }
    this.phrases = newPhraseState;
    return updated;
  }

  /*
    HELPER: Find current min count key in phrases obj
  */
  findMinCount() {
    // if(this. = 0) { return 0; }

    let min = Number.MAX_SAFE_INTEGER;
    for(var countKey in this.phrases) {
      if(countKey < min) {
        min = countKey;
      }
    }
    return min;
  }
};

module.exports = TopPhrases;