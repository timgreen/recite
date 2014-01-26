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
  goog.base(this, recite.word.WordSource.google, word);
};
goog.inherits(recite.source.oald.OaldWord, recite.word.Word);
