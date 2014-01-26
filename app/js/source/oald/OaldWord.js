goog.provide('recite.source.oald.OaldWord');

goog.require('recite.word.Word');
goog.require('recite.word.WordSource');



/**
 * @constructor
 * @extends {recite.word.Word}
 *
 * @param {string} word
 */
recite.source.oald.OaldWord = function(word) {
  goog.base(this, recite.word.WordSource.oald, word);
};
goog.inherits(recite.source.oald.OaldWord, recite.word.Word);


/**
 * @inheritDoc
 */
recite.source.oald.OaldWord.prototype.getData = function() {
  return {
    'url': 'http://oald8.oxfordlearnersdictionaries.com/dictionary/' + this.word
  };
};
