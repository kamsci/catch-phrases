var expect = require('chai').expect;
var TopPhrases = require('../TopPhrases.js');

/* 
  Part 2 - TopPhrases objext: Keep track of top Phrases
*/
describe('Instantiate new TopPhrases object,', () => {
  it('should create a new object with defaults', () => {
    let expectedTopTenObj = {
      maxPhraseCounts: 10,
      phrases: {}
    }

    let actualTopTenObj = new TopPhrases(10);

    expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
  });

  it('should create a new object with maxPhrases 10 if no parameter specified', () => {
    let expectedTopTenObj = {
      maxPhraseCounts: 10,
      phrases: {}
    }

    let actualTopTenObj = new TopPhrases();

    expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
  });
});

describe('Check to add Phrase: ', () => {
  it('should return false if phrase or count are empty or undefined, or count is 0', () => {
    let expectedTopTenObj = new TopPhrases();
    let phrase = "";
    let count = 0;
    let phrase2;
    let count2;

    let actualTopTenObj = new TopPhrases();
    let added = actualTopTenObj.addedPhrase(phrase, count);
    let added2 = actualTopTenObj.addedPhrase(phrase2, count2);

    expect(added).to.be.false;
    expect(added2).to.be.false;
    expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
  });

  describe('If TopPhrases obj is empty,', () => {
    it('should add the count key with phrase as value array to phrases array and return true', () => {
      let expectedTopTenObj = {
        maxPhraseCounts: 10,
        phrases: { 
          "1": ["it has two"]
         }
      }
      let phrase = "it has two";
      let count = 1;
      
      let actualTopTenObj = new TopPhrases(10);
      let added = actualTopTenObj.addedPhrase(phrase, count);
      
      expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
      expect(added).to.be.true;
    });
  });

  describe('If TopPhrases obj is not empty but not at maxPhraseCounts', () => {
    describe('and new phrase count is unique', () => {
      it('should add the count key with phrase as value array and return true', () => {
        let expectedTopTenObj = {
          maxPhraseCounts: 10,
          phrases: {
            "1": ["it has two"],
            "2": ["two well-thought-out sentences"]
          }
        }
        let phrase = "it has two";
        let count = 1;

        let phrase2 = "two well-thought-out sentences";
        let count2 = 2;
        
        let actualTopTenObj = new TopPhrases(10);
        let added = actualTopTenObj.addedPhrase(phrase, count);
        let added2 = actualTopTenObj.addedPhrase(phrase2, count2);

        expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
        expect(added).to.be.true;
        expect(added2).to.be.true;
      });
    });

    describe('and new phrase count is a repeat - not unique', () => {
      it('should find matching count key, add phrase to array and return true', () => {
        let expectedTopTenObj = {
          maxPhraseCounts: 10,
          phrases: {
            "1": ["it has two"],
            "2": ["two well-thought-out sentences", "not one but"]
          }
        }
        let phrase = "it has two";
        let count = 1;

        let phrase2 = "two well-thought-out sentences";
        let count2 = 2;

        let phrase3 = "not one but";
        let count3 = 2;
        
        let actualTopTenObj = new TopPhrases(10);
        let added = actualTopTenObj.addedPhrase(phrase, count);
        let added2 = actualTopTenObj.addedPhrase(phrase2, count2);
        let added3 = actualTopTenObj.addedPhrase(phrase3, count3);

        expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
        expect(added).to.be.true;
        expect(added2).to.be.true;
        expect(added3).to.be.true;
      });
    });
  });

  describe('If TopPhrases obj is at maxPhraseCounts', () => {
    describe('and new phrase count IS UNIQUE and IS higher than both exisitng counts', () => {
      it('should replace phrase with lowest count as obj in array and return true', () => {
        let expectedTopTenObj = {
          maxPhraseCounts: 2,
          phrases: {         
            "2": ["two well-thought-out sentences"], 
            "3": ["not one but"],
          }
        }
        let phrase = "it has two";
        let count = 1;

        let phrase2 = "two well-thought-out sentences"
        let count2 = 2;

        let phrase3 = "not one but";
        let count3 = 3;
        
        let actualTopTenObj = new TopPhrases(2); // created obj with max of 2 phrases
        let added = actualTopTenObj.addedPhrase(phrase, count);
        let added2 = actualTopTenObj.addedPhrase(phrase2, count2);
        let added3 = actualTopTenObj.addedPhrase(phrase3, count3);

        expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
        expect(added).to.be.true;
        expect(added2).to.be.true;
        expect(added3).to.be.true;
      });
    });

    describe('and new phrase count IS UNIQUE but NOT higher than both exisitng counts', () => {
      it('should return without replacing phrase and return false', () => {
        let expectedTopTenObj = {
          maxPhraseCounts: 2,
          phrases: {         
            "4": ["two well-thought-out sentences"], 
            "3": ["it has two"],
          }
        }
        let phrase = "it has two";
        let count = 3;

        let phrase2 = "two well-thought-out sentences"
        let count2 = 4;

        let phrase3 = "not one but";
        let count3 = 1;
        
        let actualTopTenObj = new TopPhrases(2); // created obj with max of 2 phrases
        let added = actualTopTenObj.addedPhrase(phrase, count);
        let added2 = actualTopTenObj.addedPhrase(phrase2, count2);
        let added3 = actualTopTenObj.addedPhrase(phrase3, count3);

        expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
        expect(added).to.be.true;
        expect(added2).to.be.true;
        expect(added3).to.be.false;
      });
    });

   describe('and new phrase count is NOT UNIQUE but IS EQUAL to an exisitng count', () => {
      it('should add phrase to correct count key and return true', () => {
        let expectedTopTenObj = {
          maxPhraseCounts: 2,
          phrases: {         
            "2": ["two well-thought-out sentences", "not one but"], 
            "3": ["it has two"],
          }
        }
        let phrase = "it has two";
        let count = 3;

        let phrase2 = "two well-thought-out sentences"
        let count2 = 2;

        let phrase3 = "not one but";
        let count3 = 2;
        
        let actualTopTenObj = new TopPhrases(2); // created obj with max of 2 phrases
        let added = actualTopTenObj.addedPhrase(phrase, count);
        let added2 = actualTopTenObj.addedPhrase(phrase2, count2);
        let added3 = actualTopTenObj.addedPhrase(phrase3, count3);

        expect(actualTopTenObj).to.deep.equal(expectedTopTenObj);
        expect(added).to.be.true;
        expect(added2).to.be.true;
        expect(added3).to.be.true;
      });
    });

  });

});
