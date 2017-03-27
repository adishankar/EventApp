angular.module('SearchCtrl', [])
    .controller('SearchCtrl', ['$scope', 'eventService', 'orgService', function SearchCtrl($scope, eventService, orgService) {
        $scope.hello = 'hello world';
        $scope.allEvents;
        $scope.allOrgs;
        $scope.searchResults;

        $scope.searchEvents = function(event){
            var promise = eventService.searchEvents(event);
            promise.then(function (data){
                console.log(data.data);
                $scope.searchResults = data.data;
            });
        };

        $scope.searchOrgs = function(org){
            var promise = orgService.searchOrgs(org);
            promise.then(function (data){
                console.log(data.data);
                $scope.searchResults = data.data;
            });
        };

        $scope.querySearch = function(search){
            console.log(search);
            if (search.type == 'org')
                $scope.searchOrgs(search.query);
            else if (search.type == 'event'){
                $scope.searchEvents(search.query);
            }
        };

        $scope.init = function(){
            //$scope.allOrgs = $scope.searchAllOrgs();
            //$scope.allEvents = $scope.searchAllEvents();
        };
        
    }]);