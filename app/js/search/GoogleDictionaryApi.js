goog.provide('recite.search.GoogleDictionaryApi');
goog.provide('recite.search.GoogleDictionaryResult');

goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.array');
goog.require('goog.net.XhrIo');
goog.require('recite.search.SearchApi');
goog.require('recite.search.SearchResult');



/**
 * @constructor
 * @implements {recite.search.SearchApi}
 */
recite.search.GoogleDictionaryApi = function() {
};
goog.addSingletonGetter(recite.search.GoogleDictionaryApi);


/**
 * Search a word.
 *
 * @param {string} query query to search.
 * @param {function(recite.search.SearchResult)} callback callback function.
 */
recite.search.GoogleDictionaryApi.prototype.search = function(query, callback) {
  var uri = new goog.Uri('https://www.google.com/dictionary/json');
  uri.setQueryData(goog.Uri.QueryData.createFromMap({
    'q': query,
    'sl': 'en',
    'tl': 'en',
    'callback': 'a'
  }));
  goog.net.XhrIo.send(uri, function(e) {
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);
    // TODO(timgreen): check status
    var text = xhr.getResponseText();
    // NOTE(timgreen): hack jsonp result to json, sandbox workaround.
    text = text.substr('a('.length);
    text = text.substring(0, text.lastIndexOf(','));
    text = text.substring(0, text.lastIndexOf(','));
    text = text.replace(/\\x(..)/g, function(a, i) {
      return String.fromCharCode(parseInt(i, 16));
    });
    var json = /** @type {Object} */ (JSON.parse(text));
    var result = new recite.search.GoogleDictionaryResult(json);
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
  goog.base(this, json['query'], 'google-dictionary', json);
};
goog.inherits(recite.search.GoogleDictionaryResult, recite.search.SearchResult);
