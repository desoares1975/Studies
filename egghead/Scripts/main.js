var app = angular.module('behaviorApp', []);

app.directive('enter', function () {
  return function (scope, element) {
    element.bind('mouseenter', function() {
      console.log('Estou dentro de você!')
    });
  }
});

app.directive('leave', function () {
  return function (scope, element) {
    element.bind('mouseleave', function() {
      console.log('Estou fora de você!')
    });
  }
});