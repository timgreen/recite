goog.provide('recite.search.OaldApi');
goog.provide('recite.search.OaldResult');

goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');
goog.require('goog.dom');
goog.require('goog.dom.xml');
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
    var entryContent = recite.search.OaldApi.createResult(xhr.getResponseText());
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
recite.search.OaldApi.createResult = function(htmlText) {
  var start = '<div id="entryContent">';
  var end = '<!-- End of DIV entry-->';
  if (htmlText.indexOf(start) != -1) {
    var tmp = htmlText.substr(htmlText.indexOf(start) + start.length);
    var entryContent = tmp.substring(0, tmp.indexOf(end));
    return recite.search.OaldApi.createWord(entryContent);
  }
};


/**
 * Create word.
 *
 * @param {string} htmlText html.
 * @return {*}
 */
recite.search.OaldApi.createWord = function(htmlText) {
  var replaceImages = [
    {
      from: 'http://oald8.oxfordlearnersdictionaries.com/external/images/coresym.gif',
      to: 'assets/images/oald/coresym.gif'
    },
    {
      from: 'http://oald8.oxfordlearnersdictionaries.com/external/images/pron-uk.gif',
      to: 'assets/images/oald/pron-uk.gif'
    },
    {
      from: 'http://oald8.oxfordlearnersdictionaries.com/external/images/pron-us.gif',
      to: 'assets/images/oald/pron-us.gif'
    }
  ];
  replaceImages.forEach(function(replace) {
    htmlText = htmlText.replace(new RegExp(replace.from, 'g'), replace.to);
  });

  console.log('xml', goog.dom.xml.loadXml(htmlText));
  // TODO(timgreen): new word
  return htmlText;
};
