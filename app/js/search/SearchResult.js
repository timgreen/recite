goog.provide('recite.search.SearchResult');



/**
 * @constructor
 *
 * @param {string} word
 * @param {*} data
 */
recite.search.SearchResult = function(word, data) {
  this.word = word;
  this.data = data;
};


/**
 * @type {string}
 */
recite.search.SearchResult.prototype.word;


/**
 * @type {*}
 */
recite.search.SearchResult.prototype.data;


/**
 * @return {string}
 */
recite.search.SearchResult.prototype.getType = goog.abstractMethod;
