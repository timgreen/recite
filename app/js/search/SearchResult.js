goog.provide('recite.search.SearchResult');



/**
 * @constructor
 *
 * @param {string} word
 * @param {string} type
 * @param {*} data
 */
recite.search.SearchResult = function(word, type, data) {
  this['word'] = word;
  this['type'] = type;
  this['data'] = data;
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
 * @return {*}
 */
recite.search.SearchResult.prototype.getDate = function() {
  return this['data'];
};
