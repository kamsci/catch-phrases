## Catch Phrase
w: kristacalderon.com/catch-phrase

#### Summary
Given a string representing a document, this app returns the top 10 most frequent repeated phrases. A phrase is a stretch of three to ten consecutive words and cannot span sentences. A phrase is only included as a top phrase if it is not a subset of another, longer phrase (if “calm cool” and “calm cool and collected” are repeated, “calm cool” is not included in the returned set).

#### How do you turn it on?
- Fork and Clone
    - Run 'npm install'

This is a console application, so the output will appear in your console or terminal window
 - Run 'npm start' to see output in console
 - Run 'npm test' to execute existing unit tests (using mocha/chai)

#### Assumptions
- Document content is limited to alphanumeric and basic punctuation; no urls, emails, line breaks, html, etc.
- Sentences are defined by ending in one of the following:
    - period (.)
    - explanation point (!)
    - question mark (?)
    - semi-colon (;)
- Punctuation that is removed: 
    - commas (,)
    - parenthesis (())
    - colons (:)
    - dashes in non-hyphenated words ( - ) 
- Phrases do not dependent on removed punctuation. ie. "calm cool" is the same as "calm, cool" 
- Hyphenated words are counted as 1 word. ie. "state-of-the-art"
- The priority between multiple phrases with the same count is unknown; therefore, in order to preserve data, if there is a tie in the top ten counts, all phrases with the same count will be returned
    - This means >10 phrases can be returned
- I was unsure if I should combine counts when determining if a phrase is a subset of a larger phrase, so at this point I am keeping the original count of the larger phrase

#### TO DO
- Refactor TopPhrases.getTopTenArrayOfPhrases() function to re-calculate top ten after subsets are removed
- Add Unit Tests for TopPhrases class
- ...I'm sure there is more :)
