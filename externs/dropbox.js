var Dropbox = {};



/**
 * @constructor
 *
 * @param {Object} config
 */
Dropbox.Client = function(config) {};


/**
 * @param {{interactive: boolean}=} opt_options
 * @param {function((Dropbox.ApiError|Dropbox.AuthError), Dropbox.Client)=} opt_callback
 */
Dropbox.Client.prototype.authenticate = function(opt_options, opt_callback) {};


/**
 * @return {boolean}
 */
Dropbox.Client.prototype.isAuthenticated = function() { return true; };


/**
 * @return {Dropbox.Datastore.DatastoreManager}
 */
Dropbox.Client.prototype.getDatastoreManager = function() { return null; };



/**
 * @constructor
 */
Dropbox.Datastore = function() {};


/**
 * @param {string} name
 * @return {Dropbox.Datastore.Table}
 */
Dropbox.Datastore.prototype.getTable = function(name) { return null; };



/**
 * @constructor
 */
Dropbox.Datastore.DatastoreManager = function() {};


/**
 * @param {function(*, Dropbox.Datastore)} callback
 */
Dropbox.Datastore.DatastoreManager.prototype.openDefaultDatastore = function(callback) {};



/**
 * @constructor
 */
Dropbox.Datastore.Table = function() {};


/**
 * @param {Object} fieldValues
 * @return {Dropbox.Datastore.Record}
 */
Dropbox.Datastore.Table.prototype.insert = function(fieldValues) { return null; };



/**
 * @constructor
 */
Dropbox.Datastore.Record = function() {};



/**
 * @constructor
 */
Dropbox.ApiError = function() {};



/**
 * @constructor
 */
Dropbox.AuthError = function() {};
