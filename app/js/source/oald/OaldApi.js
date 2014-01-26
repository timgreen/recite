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
    var entryContent = recite.source.oald.OaldApi.createResult(xhr.getResponseText());
    console.log(entryContent);
    var dom = /** @type {DocumentFragment} */ (goog.dom.htmlToDocumentFragment(entryContent));
    console.log(dom);
  });
};


/**
 * Create result.
 *
 * @param {string} htmlText html.
 * @return {*}
 */
recite.source.oald.OaldApi.createResult = function(htmlText) {
  var start = '<div id="entryContent">';
  var end = '<!-- End of DIV entry-->';
  if (htmlText.indexOf(start) != -1) {
    var tmp = htmlText.substr(htmlText.indexOf(start) + start.length);
    var entryContent = tmp.substring(0, tmp.indexOf(end));
    return recite.source.oald.OaldWordFactory.createWord(entryContent);
  }
};
