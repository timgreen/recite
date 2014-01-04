goog.provide('recite.DropboxService');



/**
 * @constructor
 */
recite.DropboxService = function() {
  var DROPBOX_APP_KEY = 'whmi318p8xpr56a';
  this.client_ = new Dropbox.Client({key: DROPBOX_APP_KEY});
  this.client_.authenticate({interactive: false}, function(error) {
    if (error) {
      console.debug('Authentication error: ' + error);
    }
  });
};


/**
 * @type {Dropbox.Client}
 * @private
 */
recite.DropboxService.prototype.client_ = null;


/**
 * @return {Dropbox.Client}
 */
recite.DropboxService.prototype.getClient = function() {
  return this.client_;
};
