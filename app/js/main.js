goog.provide('recite.App');

goog.require('recite.DropboxService');


/**
 * Entry point.
 */
recite.App.main = function() {
  var dropbox = new recite.DropboxService();
  console.log('oauth', dropbox.getClient().isAuthenticated());
  if (!dropbox.getClient().isAuthenticated()) {
    dropbox.getClient().authenticate();
  }
};
goog.exportSymbol('recite.App.main', recite.App.main);
