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
- At this time, additional phrases past the top ten with the same count as those in the top ten are not listed. (UPDATED, see below)
- I was unsure if I should combine counts when determining if a phrase is a subset of a larger phrase, so at this point I am keeping the original count of the larger phrase

#### TO DO
- DONE, first part: Potentially  include all phrases that have a count that is in the top 10 OR identify some priority of inclusion
- IMPROVED: Add more unit tests

#### Update on To Do List
- Solve for Ties: If there are several phrases with the same count tied for the top ten, then all phrases with that count are included.
- Option to Remove Singles: Handling ties is a cool feature option, but now if we have a 1 in the top ten, all phrases are listed! So to solve for that issue, you now send a boolean value along with your top ten request: true, you include singles, false you remove singles.
- Of course, unit tests were added, updated, and expanded to accommodate the new functionality.
