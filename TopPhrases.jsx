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
    this.totalPhrases = 0;
    this.phrases = {};
  }

  addedPhrase(phrase, count) {
    if(phrase === "" || phrase === undefined
      || count < 1 || count === undefined) {
        return false;
      }

    let didUpdate = false;
    // Quantity of phrases count has not reached maxPhraseCounts
    if(this.maxPhraseCounts > Object.keys(this.phrases).length) {
      // If count already exist, add phrase to array, if not add new key
      if(this.phrases.hasOwnProperty(count)) {
        this.phrases[count].push(phrase);
      } else {
        this.phrases[count] = [phrase];
      }
      // Update total phrases
      this.totalPhrases++; 
      console.log("Total: ", this.totalPhrases);
      didUpdate = true;
    } 
    // Quantity of phrases has reached maxPhraseCounts, replace a key if count > minimum key
    else {
      didUpdate = this.tryReplacePhrase(phrase, count, this.totalPhrases);
    }
    console.log("CheckDidUpdate", didUpdate);
    return didUpdate;
  }

  tryReplacePhrase(phrase, count, totalPhrases) {
    let updated = false;
    let min = this.findMinCount();
    console.log("TotalInReplace: ", totalPhrases);

    // Return without updating if count is less than current min
    if (count <  min) { return updated; }

    let newPhraseState = {};

    // Create newPhraseState to replace this.phrases
    for(var countKey in this.phrases) {
      // Find minimum key and replace with new key,value (count, phrase)
      if(countKey === min) {
        newPhraseState[count] = [phrase];
        updated = true;

        // Update totalPhrases
        this.updatePhraseCount(totalPhrases, this.phrases[countKey].length);     
      } 
      else {
        newPhraseState[countKey] = this.phrases[countKey];
      }
    }
    this.phrases = newPhraseState;
    console.log("newTop", this)
    console.log("newTotal:", this.totalPhrases)
    return updated;
  }

  findMinCount() {
    if(this.totalPhrases = 0) { return 0; }

    let min = Number.MAX_SAFE_INTEGER;
    for(var countKey in this.phrases) {
      if(countKey < min) {
        min = countKey;
      }
    }
    return min;
  }

  updatePhraseCount(total, remove) {
    console.log("TotalUpdate: ", total);
    this.totalPhrases = (total - remove) + 1;
  }
};

module.exports = TopPhrases;