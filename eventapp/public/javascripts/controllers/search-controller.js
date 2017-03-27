angular.module('SearchCtrl', [])
    .controller('SearchCtrl', ['$scope', 'eventService', 'orgService', function SearchCtrl($scope, eventService, orgService) {
        $scope.hello = 'hello world';

        $scope.searchAllEvents = function(){
            var promise = eventService.getAllEvents();
            promise.then(function (data){
                console.log(data.data);
                $scope.events = data.data;;
            });
        };

        $scope.searchAllOrgs = function(){
            var promise = orgService.getAllOrgs();
            promise.then(function (data){
                console.log(data.data);
                $scope.orgs = data.data;;
            });
        };
        
    }]);