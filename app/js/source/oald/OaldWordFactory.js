goog.provide('recite.source.oald.OaldWordFactory');

goog.require('recite.source.oald.OaldWord');
goog.require('recite.word.WordFactory');



/**
 * @constructor
 * @implements {recite.word.WordFactory}
 */
recite.source.oald.OaldWordFactory = function() {
};
goog.addSingletonGetter(recite.source.oald.OaldWordFactory);


/**
 * @param {string} word
 * @param {string} content
 * @return {recite.source.oald.OaldWord}
 */
recite.source.oald.OaldWordFactory.prototype.deserialize = function(word, content) {
  return null;
};


/**
 * Create word.
 *
 * @param {string} htmlText html.
 * @return {*}
 */
recite.source.oald.OaldWordFactory.createWord = function(htmlText) {
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
