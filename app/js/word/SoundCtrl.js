goog.provide('recite.word.SoundCtrl');

goog.require('goog.dom.classes');
goog.require('goog.events');


/**
 * Sound Controller.
 *
 * @param {angular.Scope} $scope scope.
 */
recite.word.SoundCtrl = function($scope) {
  $scope.play = function(audioContainer) {
    var audio = audioContainer.children[0];
    goog.dom.classes.add(audioContainer, 'playing');
    goog.events.listenOnce(audio, 'ended', function() {
      goog.dom.classes.remove(audioContainer, 'playing');
    });
    audio.play();
  };
};
recite.word.SoundCtrl['$inject'] = ['$scope'];
