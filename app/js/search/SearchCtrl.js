goog.provide('recite.search.SearchCtrl');
goog.require('recite.search.GoogleDictionaryApi');


/**
 * Search Controller.
 *
 * @param {angular.Scope} $scope scope.
 */
recite.search.SearchCtrl = function($scope) {
  $scope.searchWordInput = '';
  $scope.searchWord = function() {
    console.log('ok', $scope.searchWordInput);
    recite.search.GoogleDictionaryApi.getInstance().search($scope.searchWordInput, function(reply) {
      console.log(reply);
      $scope.$apply(function() {
        $scope.searchWordInput = '';
      });
    });
  };
};
recite.search.SearchCtrl['$inject'] = ['$scope'];
