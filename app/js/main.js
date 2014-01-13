goog.provide('recite.App');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('recite.DropboxService');
goog.require('recite.search.SearchCtrl');


/**
 * Entry point.
 */
recite.App.main = function() {
  var dropbox = new recite.DropboxService();
  console.log('oauth', dropbox.getClient().isAuthenticated());
  if (!dropbox.getClient().isAuthenticated()) {
    dropbox.getClient().authenticate();
  }

  goog.events.listen(goog.dom.getElement('add-word-btn'), 'click', function() {
    var input = goog.dom.getElement('add-word-input');
    var word = input.value;
    input.value = '';
    dropbox.addWord(word);
    console.log('add word', word);
  });

  var module = angular.module('recite', []);

  // TODO(timgreen): fix this
  module.config(['$sceProvider', function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  }]);

  module.controller('search.SearchCtrl', recite.search.SearchCtrl);

  recite.App.registerDirective(module, 'word/result', ['result']);
  recite.App.registerDirective(module, 'word/primary-list', ['primaries']);
  recite.App.registerDirective(module, 'word/primary', ['primary']);
  recite.App.registerDirective(module, 'word/primary-headword', ['primary']);
  recite.App.registerDirective(module, 'word/primary-meaning', ['primary']);
  recite.App.registerDirective(module, 'word/primary-container', ['primary']);
  recite.App.registerDirective(module, 'word/primary-related', ['primary']);
  recite.App.registerDirective(module, 'word/term', ['term']);
};
goog.exportSymbol('recite.App.main', recite.App.main);


/**
 * Register directive.
 *
 * @param {angular.Module} module module.
 * @param {string} path path to directives haml definition, no include '.haml'.
 * @param {Array.<string>=} opt_params params needed for this directive.
 */
recite.App.registerDirective = function(module, path, opt_params) {
  // turn aa/bb/cc/dd-ee-ff to aaBbCcdDeEfF
  var name = path.replace(/[/-][a-z]/g, function(s) {return s[1].toUpperCase();});
  var scope = {};
  goog.array.forEach(opt_params || [], function(param) {
    scope[param] = '=';
  });
  module.directive(name, ['$compile', function($compile) {
    return {
      'restrict': 'E',
      'templateUrl': 'directives/' + path + '.html',
      'scope': scope,
      'compile': function(element) {
        // solve directive recursion
        var contents = element.contents().remove();
        var compiledContents;
        return function(scope, element) {
          if (!compiledContents) {
            compiledContents = $compile(contents);
          }
          compiledContents(scope, function(clone) {
            element.append(clone);
          });
        };
      }
    };
  }]);
};
