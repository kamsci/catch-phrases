'use strict';
var myDocument = require('./document.json');
var PhrasesDictionary = require('./PhrasesDictionary.js');

/*
  Run Program function
*/
let runProgram = () => {
  let myDictionary = new PhrasesDictionary(myDocument.content2, 3, 10);

  console.log("---------------------------------------------------------")
  console.log("-            Top Ten Phrases(Singles Included)          -")
  console.log("---------------------------------------------------------")
  console.log(myDictionary.topTenPhrases);
  console.log("---------------------------------------------------------")
  console.log("-              Top Ten Phrases(No Singles)              -")
  console.log("---------------------------------------------------------")
  console.log(myDictionary.topTenPhrasesNoSingles);
  console.log("---------------------------------------------------------")
}

/*
  START
*/
runProgram();

