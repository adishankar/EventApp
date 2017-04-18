angular.module('SearchCtrl', [])
    .controller('SearchCtrl', ['$scope', '$window', 'eventService', 'orgService', 'userService',
    function SearchCtrl($scope, $window, eventService, orgService, userService) {
        $scope.hello = 'hello world';
        $scope.allEvents;
        $scope.allOrgs;
        $scope.searchResults;
        var type;
        var eventMain;

        $scope.searchEvents = function(event){
            eventMain = event;
            $scope.searchResults = [];
            var user = userService.getUserData();
            eventService.searchEvents(event, user).then(function (data){
                if(data.data == "none"){
                    $scope.error = "No results found for: " + eventMain;
                }else{
                    $scope.searchResults = data.data;
                    $scope.error = undefined;
                    type = 'event';
                }
                
                //$window.location.reload();
            });
        };

        var orgMain;

        $scope.searchOrgs = function(org){
            $scope.searchResults = [];
          // console.log(org);
            orgMain = org;
            var user = userService.getUserData();
            var promise = orgService.searchOrgs(org, user);
            promise.then(function (data2){
                if(data2.data == "No Results") return;
                if(data2.data == "none"){
                    $scope.error = "No results found for: " + orgMain;
                }else{
                    $scope.searchResults = data2.data;
                    $scope.error = undefined;
                    type = 'org';
                }
                //$window.location.reload();
            });
        };

        $scope.querySearch = function(search){
            if(!search.type){
                search.type='org';
            }
          // console.log(search);
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
                var url = '../rso/';
                
            }
            var url = url + sr.id.toString();
            $window.location.href = url;
            
        };

        $scope.init = function(){
            //$scope.allOrgs = $scope.searchAllOrgs();
            //$scope.allEvents = $scope.searchAllEvents();
        };
        
    }]);