goog.provide('recite.search.GoogleDictionaryApi');
goog.require('goog.net.Jsonp');



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
  var payload = { 'foo': 1, 'bar': true };
  jsonp.send({
    'q': word,
    'sl': 'en',
    'tl': 'en'
  }, callback);
};
