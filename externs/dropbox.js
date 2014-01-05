var Dropbox = {};



/**
 * @constructor
 *
 * @param {Object} config
 */
Dropbox.Client = function(config) {};


/**
 * @param {Object=} opt_config
 * @param {Function=} opt_callback
 */
Dropbox.Client.prototype.authenticate = function(opt_config, opt_callback) {};


/**
 * @return {Boolean}
 */
Dropbox.Client.prototype.isAuthenticated = function() {};


/**
 * @return {Dropbox.Datastore.DatastoreManager}
 */
Dropbox.Client.prototype.getDatastoreManager = function() {};



/**
 * @constructor
 */
Dropbox.Datastore = function() {};


/**
 * @param {string} name
 * @return {Dropbox.Datastore.Table}
 */
Dropbox.Datastore.prototype.getTable = function(name) {};



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
Dropbox.Datastore.Table.prototype.insert = function(fieldValues) {};



/**
 * @constructor
 */
Dropbox.Datastore.Record = function() {};
