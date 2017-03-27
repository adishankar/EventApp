angular.module('SearchCtrl', [])
    .controller('SearchCtrl', ['$scope', 'eventService', 'orgService', function SearchCtrl($scope, eventService, orgService) {
        $scope.hello = 'hello world';
    }]);