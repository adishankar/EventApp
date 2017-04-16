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
        // $scope.user;

        $scope.init = function(){

            var url = $location.url().toString();
                var event = url.split('event/');
                eventId = event[1];
                console.log(eventId);
            

            var promise = eventService.getEvent(eventId);
            promise.then(function (data){
                console.log(data);
                //TODO: loadcomments using event service here:
                thisEvent = data.data;
                if(data.data == "invalid"){
                    $scope.eventname = "This event does not exist. ERROR";
                    return;
                }
                //console.log(thisEvent);
                console.log(thisEvent.locationId);
                eventService.getLocation(thisEvent.locationId)
                    .then(function(more){
                        console.log("got here");
                        $scope.location = more.data[0];
                        //console.log($scope.location);
                        console.log(more.data[0]);
                        var LatLng={
                            lat: parseFloat($scope.location.locationLatitude),
                            lng: parseFloat($scope.location.locationLongitude)
                        }
                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: LatLng,
                            animation: google.maps.Animation.DROP
                        });

                        console.log("event");
                        console.log(thisEvent);
                        //$scope.currentMarker = marker;
                        //$scope.updateLocations;
                        $scope.map.setCenter(marker.getPosition());
                        $scope.eventname = thisEvent.title;
                        $scope.eventdescription = thisEvent.description;
                        $scope.eventstart = new Date(thisEvent.start).toLocaleString();
                        $scope.eventend = new Date(thisEvent.end).toLocaleString();
                        $scope.user = userService.getUserData();
                        console.log($scope.user);
                        eventService.getComments(thisEvent.id)
                            .then(function(data2){
                                console.log("hi1");
                                console.log(data2.data);
                                $scope.comments = data2;
                            });
                });
                
                
            });
        };

        $scope.makeComment = function(comment){

            console.log(thisEvent);

            var user = userService.getUserData();

            comment.author = user.username;
            var promise2 = eventService.makeComment(thisEvent, comment, user);
            promise2.then(function (data2){
                 console.log(data2.data);

                 //$scope.comments = data2.data.comments;
                 $window.location.reload();
             });
        };

        $scope.deleteComment = function(commentID){
            console.log(commentID);
            eventService.deleteComment(commentID).then(function(data){$window.location.reload()});
        }
        
    }]);