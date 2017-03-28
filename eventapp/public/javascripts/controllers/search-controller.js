angular.module('SearchCtrl', [])
    .controller('SearchCtrl', ['$scope', '$window', 'eventService', 'orgService', function SearchCtrl($scope, $window, eventService, orgService) {
        $scope.hello = 'hello world';
        $scope.allEvents;
        $scope.allOrgs;
        $scope.searchResults;
        var type;

        $scope.searchEvents = function(event){
            var promise = eventService.searchEvents(event);
            promise.then(function (data){
                console.log(data.data);
                $scope.searchResults = data.data;
                type = 'event';
                //$window.location.reload();
            });
        };

        $scope.searchOrgs = function(org){
            var promise = orgService.searchOrgs(org);
            promise.then(function (data){
                console.log(data.data);
                $scope.searchResults = data.data;
                type = 'org';
                //$window.location.reload();
            });
        };

        $scope.querySearch = function(search){
            console.log(search);
            if (search.type == 'org')
                $scope.searchOrgs(search.query);
            else if (search.type == 'event'){
                $scope.searchEvents(search.query);
                //$window.location.reload();
            }
        };

        $scope.goTo = function(sr){

            if (type == 'event'){
                var url = '../event/';
            }
            else if (type == 'org'){
                var url = '../organization/';
                
            }
            var url = url + sr.name.toString();
            $window.location.href = url;
            
        };

        $scope.init = function(){
            //$scope.allOrgs = $scope.searchAllOrgs();
            //$scope.allEvents = $scope.searchAllEvents();
        };
        
    }]);