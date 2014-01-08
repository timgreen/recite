goog.provide('recite.search.SearchCtrl');

goog.require('goog.format.JsonPrettyPrinter');
goog.require('goog.format.JsonPrettyPrinter.TextDelimiters');
goog.require('recite.search.GoogleDictionaryApi');


/**
 * Search Controller.
 *
 * @param {angular.Scope} $scope scope.
 */
recite.search.SearchCtrl = function($scope) {
  $scope.searchWordInput = '';
  $scope.ouptut = '';
  $scope.searchWord = function() {
    recite.search.GoogleDictionaryApi.getInstance().search($scope.searchWordInput, function(reply) {
      $scope.$apply(function() {
        $scope.searchWordInput = '';
        var printer = new goog.format.JsonPrettyPrinter(
            new goog.format.JsonPrettyPrinter.TextDelimiters());
        $scope.result = reply;
        $scope.output = printer.format(reply);
      });
    });
  };
};
recite.search.SearchCtrl['$inject'] = ['$scope'];
