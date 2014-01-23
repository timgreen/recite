goog.provide('recite.search.SearchApi');

goog.require('recite.search.SearchResult');



/**
 * @interface
 */
recite.search.SearchApi = function() {};


/**
 *
 * @param {string} query query to search.
 * @param {function(recite.search.SearchResult)} callback callback function.
 */
recite.search.SearchApi.prototype.search = function(query, callback) {};
