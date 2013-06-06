var app = angular.module('superhero', []);

app.directive('superman', function () {
  return {
    restrict: 'E',
    template: '<div>Aqui estou para salver o dia</div>'
  };
});