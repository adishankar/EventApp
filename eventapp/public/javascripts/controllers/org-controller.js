angular.module('app', ['eventService'])
    .config(function($locationProvider){
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
    })
    .controller('OrgCtrl', ['$scope', '$location', 'eventService', function OrgCtrl($scope, $location, eventService) {

            $scope.orgname = "";

            $scope.init = function(){
                var url = $location.url().toString();
                var org = url.split('organization/');
                $scope.orgname = org[1];
                console.log(org[1]);
            }

            //event creation stuff
            $scope.master = {};
            $scope.save = function(event) {
                //createdEvents.push(angular.copy(event));
                console.log(event);
                eventService.createEvent(event, $scope.orgname);


                $scope.reset();
            };

            $scope.reset = function() {
                $scope.event = angular.copy($scope.master);
            };

            $scope.reset();

            $scope.events = events;
        }]);

    var events = [{name: "event1", description: "event1 description"},{name: "event2", description: "event2 description"},
        {name: "event3", description: "event3 description"},{name: "event4", description: "event4 description"},
        {name: "event5", description: "event5 description"},{name: "event6", description: "event6 description"},
        {name: "event7", description: "event7 description"}];