goog.provide('recite.search.SearchResult');

goog.require('recite.word.Word');



/**
 * @constructor
 *
 * @param {recite.word.Word} word
 */
recite.search.SearchResult = function(word) {
  this['word'] = word.word;
  this['type'] = word.source;
  this['data'] = word.getData();
};


/**
 * @return {string}
 */
recite.search.SearchResult.prototype.getWord = function() {
  return this['word'];
};


/**
 * @return {string}
 */
recite.search.SearchResult.prototype.getType = function() {
  return this['type'];
};


/**
 * @return {Object}
 */
recite.search.SearchResult.prototype.getData = function() {
  return this['data'];
};
