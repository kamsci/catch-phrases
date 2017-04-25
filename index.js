'use strict';
var myDocument = require('./document.json');
var PhrasesDictionary = require('./PhrasesDictionary.js');

/*
  Run Program function
*/
let runProgram = () => {
  let myDictionary = new PhrasesDictionary(myDocument.content, 3, 10);

  console.log("---------- Top Ten Phrases ----------")
  console.log(myDictionary.topTenPhrases);
  console.log("-------------------------------------------")
}

/*
  START
*/
runProgram();

