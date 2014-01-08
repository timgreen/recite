goog.provide('recite.search.GoogleDictionaryApi');
goog.provide('recite.search.GoogleDictionaryResult');

goog.require('goog.array');
goog.require('goog.net.Jsonp');
goog.require('recite.search.SearchResult');



/**
 * @constructor
 */
recite.search.GoogleDictionaryApi = function() {
};
goog.addSingletonGetter(recite.search.GoogleDictionaryApi);


/**
 * Search a word.
 *
 * @param {string} word word to search.
 * @param {Function} callback callback function.
 */
recite.search.GoogleDictionaryApi.prototype.search = function(word, callback) {
  var jsonp = new goog.net.Jsonp(new goog.Uri('http://www.google.com/dictionary/json'));
  jsonp.send({
    'q': word,
    'sl': 'en',
    'tl': 'en'
  }, function(reply) {
    var result = new recite.search.GoogleDictionaryResult(reply);
    callback(result);
  });
};



/**
 * @constructor
 * @extends {recite.search.SearchResult}
 *
 * @param {Object} json json result from google dictionary api.
 */
recite.search.GoogleDictionaryResult = function(json) {
  goog.base(this, json['query'], json);
};
goog.inherits(recite.search.GoogleDictionaryResult, recite.search.SearchResult);


/**
 * @override
 */
recite.search.GoogleDictionaryResult.prototype.getType = function() {
  return 'google-dictionary';
};
