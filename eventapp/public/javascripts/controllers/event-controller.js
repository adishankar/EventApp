angular.module('EventCtrl', ['userService', 'orgService', 'eventService'])
    .config(function($locationProvider){
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
        })
    .controller('EventCtrl', ['$scope', '$window', '$location', 'userService', 'orgService', 'eventService', 
        function EventCtrl($scope, $window, $location, userService, orgService, eventService) {
        
        var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(28.600659, -81.197546)
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

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
                    //console.log(thisEvent);

                    $scope.eventdescription = thisEvent.description;
                    $scope.comments = thisEvent.comments;
                });
        };

        $scope.makeComment = function(comment){

            console.log(thisEvent);

            var user = userService.getUserData();

            comment.author = user.username;
            var promise = eventService.makeComment(thisEvent, comment);
            promise.then(function (data){
                 console.log(data.data.comments);

                 $scope.comments = data.data.comments;
                 $window.location.reload();
             });
        };
        
    }]);