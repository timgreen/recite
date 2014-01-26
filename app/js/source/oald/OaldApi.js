goog.provide('recite.source.oald.OaldApi');

goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.dom');
goog.require('goog.dom.xml');
goog.require('goog.net.XhrIo');
goog.require('recite.search.SearchApi');
goog.require('recite.search.SearchResult');
goog.require('recite.source.oald.OaldWordFactory');



/**
 * @constructor
 * @implements {recite.search.SearchApi}
 */
recite.source.oald.OaldApi = function() {
};
goog.addSingletonGetter(recite.source.oald.OaldApi);


/**
 * Search a word.
 *
 * @param {string} query query to search.
 * @param {function(recite.search.SearchResult)} callback callback function.
 */
recite.source.oald.OaldApi.prototype.search = function(query, callback) {
  var uri = new goog.Uri('http://oald8.oxfordlearnersdictionaries.com/search/');
  uri.setQueryData(goog.Uri.QueryData.createFromMap({
    'q': query,
    'x': 0,
    'y': 0
  }));
  goog.net.XhrIo.send(uri, function(e) {
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);
    var result = recite.source.oald.OaldApi.createResult(query, xhr.getResponseText());
    callback(result);
  });
};


/**
 * Create result.
 *
 * @param {string} word
 * @param {string} htmlText html.
 * @return {recite.search.SearchResult}
 */
recite.source.oald.OaldApi.createResult = function(word, htmlText) {
  var start = '<div id="entryContent">';
  var end = '<!-- End of DIV entry-->';
  if (htmlText.indexOf(start) != -1) {
    var tmp = htmlText.substr(htmlText.indexOf(start) + start.length);
    var entryContent = tmp.substring(0, tmp.indexOf(end));
    var w = recite.source.oald.OaldWordFactory.createWord(word, entryContent);
    return new recite.search.SearchResult(w);
  }
  // TODO(timgreen):
  return null;
};
