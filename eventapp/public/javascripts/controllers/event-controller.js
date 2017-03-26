angular.module('EventCtrl', ['userService', 'orgService', 'eventService'])
    .config(function($locationProvider){
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
        })
    .controller('EventCtrl', ['$scope', '$window', '$location', 'userService', 'orgService', 'eventService', 
        function EventCtrl($scope, $window, $location, userService, orgService, eventService) {
        
        $scope.eventname = "";
        var thisEvent;

        $scope.init = function(){

            var url = $location.url().toString();
                var event = url.split('event/');
                $scope.eventname = event[1];
                console.log(event[1]);
            

            var promise = eventService.getEvent(event[1]);
                promise.then(function (data){
                    thisEvent = data.data;
                    console.log(thisEvent);

                    $scope.eventdescription = thisEvent.description;
                });

            
        };
        
    }]);