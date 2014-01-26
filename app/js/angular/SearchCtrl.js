goog.provide('recite.angular.SearchCtrl');

goog.require('goog.format.JsonPrettyPrinter');
goog.require('goog.format.JsonPrettyPrinter.TextDelimiters');
goog.require('recite.source.oald.OaldApi');


/**
 * Search Controller.
 *
 * @param {angular.Scope} $scope scope.
 */
recite.angular.SearchCtrl = function($scope) {
  $scope.searchWordInput = '';
  $scope.ouptut = '';
  $scope.searchWord = function() {
    recite.source.oald.OaldApi.getInstance().search($scope.searchWordInput, function(reply) {
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
recite.angular.SearchCtrl['$inject'] = ['$scope'];
