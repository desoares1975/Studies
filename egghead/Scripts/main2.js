var myApp = angular.module('myApp', []);

myApp.factory('Avengers', function () {
  var Avengers = {};
  Avengers.cast = [
    {
      name: 'Robert Downey Jr.',
      character: 'Tony Stark/Irom Man'
    },
    {
      name: 'Chris Evans',
      character: 'Steve Rogers/Captain America'
    },
    {
      name: 'Mark Ruffalo',
      character: 'Bruce Banner/Hulk'
    },
    {
      name: 'Chris Hemsworth',
      character: 'Thor'
    },
    {
      name: 'Scarlett Johansson',
      character: 'Natasha Romanoff/Black Widow'
    },
    {
      name: 'Jeremy Renner',
      character: 'Clint Barton/Hawkeye'
    },
    {
      name: 'Tom Hiddleston',
      character: 'Loki'
    },
    {
      name: 'Gwyneth Paltrow',
      character: 'Pepper Potts'
    },
    {
      name: 'Samuel L. Jacson',
      character: 'Nick Fury'
    },
    {
      name: 'Paul Bettany',
      character: 'Jarvis (voice)'
    },
    {
      name: 'Alexis Denisof',
      character: 'The Other'
    },
    {
      name: 'Clark Gregg',
      character: 'Agent Phil Coulson'
    },
    {
      name: 'Cobie Smulders',
      character: 'Agent Maria Hill'
    },
    {
      name: 'Stellan Skarsgard',
      character: 'Selvig'
    }
  ];
  return Avengers;
});

function AvengersCtrl($scope, Avengers) {
  $scope.avengers = Avengers; 
}

