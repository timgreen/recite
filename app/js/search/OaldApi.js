goog.provide('recite.search.OaldApi');
goog.provide('recite.search.OaldResult');

goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.dom');
goog.require('goog.net.XhrIo');
goog.require('recite.search.SearchApi');
goog.require('recite.search.SearchResult');



/**
 * @constructor
 * @implements {recite.search.SearchApi}
 */
recite.search.OaldApi = function() {
};
goog.addSingletonGetter(recite.search.OaldApi);


/**
 * Search a word.
 *
 * @param {string} query query to search.
 * @param {function(recite.search.SearchResult)} callback callback function.
 */
recite.search.OaldApi.prototype.search = function(query, callback) {
  var uri = new goog.Uri('http://oald8.oxfordlearnersdictionaries.com/search/');
  uri.setQueryData(goog.Uri.QueryData.createFromMap({
    'q': query,
    'x': 0,
    'y': 0
  }));
  goog.net.XhrIo.send(uri, function(e) {
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);
    console.log(xhr.getResponseText());
    var dom = /** @type {Document} */ (goog.dom.htmlToDocumentFragment(xhr.getResponseText()));
    var entry = goog.dom.getElement('entryContent', dom);
    console.log(entry);
  });
};
