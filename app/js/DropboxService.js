goog.provide('recite.DropboxService');



/**
 * @constructor
 */
recite.DropboxService = function() {
  var DROPBOX_APP_KEY = 'whmi318p8xpr56a';
  this.client_ = new Dropbox.Client({'key': DROPBOX_APP_KEY});
  this.init_();
};


/**
 * @type {Dropbox.Client}
 * @private
 */
recite.DropboxService.prototype.client_ = null;


/**
 * @type {Dropbox.Datastore.Table}
 * @private
 */
recite.DropboxService.prototype.wordTable_ = null;


/**
 * @return {Dropbox.Client}
 */
recite.DropboxService.prototype.getClient = function() {
  return this.client_;
};


/**
 * @private
 */
recite.DropboxService.prototype.init_ = function() {
  this.client_.authenticate({'interactive': false}, function(error) {
    if (error) {
      console.debug('Authentication error: ' + error);
    }
  });
  var self = this;
  this.client_.getDatastoreManager().openDefaultDatastore(function(error, datastore) {
    console.log('datastore ready');
    if (error) {
      console.error('Error opening default datastore:', error);
    }

    self.wordTable_ = datastore.getTable('words');
    // Ensure that future changes update the list.
    //datastore.recordsChanged.addListener(updateList);
    console.log('table ready');
  });
};


/**
 * Add a new word.
 *
 * @param {string} word new word.
 */
recite.DropboxService.prototype.addWord = function(word) {
  this.wordTable_.insert({
    'word': word,
    'created': goog.now()
  });
};
