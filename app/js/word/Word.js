goog.provide('recite.word.Word');
goog.provide('recite.word.WordFactory');

goog.require('recite.word.WordSource');



/**
 * @constructor
 *
 * @param {recite.word.WordSource} source the source of the content.
 * @param {string} word
 */
recite.word.Word = function(source, word) {
  this.source = source;
  this.word = word;
};


/**
 * @type {recite.word.WordSource}
 */
recite.word.Word.prototype.source = null;


/**
 * @type {string}
 */
recite.word.Word.prototype.word = null;


/**
 * @protected
 * @return {string} serialized content.
 */
recite.word.Word.prototype.serializeContent = goog.abstractMethod;


/**
 * @return {string} serialized word.
 */
recite.word.Word.prototype.serialize = function() {
  return JSON.stringify({
    'source': this.source,
    'word': this.word,
    'content': this.serializeContent()
  });
};


/**
 * Deserialize word from string.
 *
 * @param {string} str serialized word.
 * @return {recite.word.Word} word from string.
 */
recite.word.Word.deserialize = function(str) {
  var json = JSON.parse(str);
  var source = /** @type {string} */ (json['source']);
  var word = /** @type {string} */ (json['word']);
  var content = /** @type {string} */ (json['content']);

  return recite.word.Word.FACTORYS[source].deserialize(word, content);
};


/**
 * @type {Object.<string, recite.word.WordFactory>}
 */
recite.word.Word.FACTORYS = {};



/**
 * @interface
 */
recite.word.WordFactory = function() {};


/**
 * @param {string} word
 * @param {string} content
 * @return {recite.word.Word}
 */
recite.word.WordFactory.prototype.deserialize = function(word, content) {};
