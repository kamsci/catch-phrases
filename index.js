'use strict';
var myDocument = require('./document.json');
var PhrasesDictionary = require('./PhrasesDictionary.js');

/*
  Run Program function
*/
let runProgram = () => {
  let myDictionary = new PhrasesDictionary(myDocument.content, 3, 10);

  // console.log(myDictionary);
  // Part 2 - Find Top 10
  
}

/*
  START
*/
runProgram();

