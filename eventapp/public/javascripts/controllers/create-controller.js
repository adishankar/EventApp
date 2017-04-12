angular.module('CreateCtrl', ['google.places'])
    .controller('CreateCtrl', ['$scope', 'userService','eventService', 'orgService', 'uniService', 
        function CreateCtrl($scope, userService, eventService, orgService, uniService) {
            
            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(28.600659, -81.197546)
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            $scope.place = null;
            $scope.currentMarker = null;

            $scope.updateMap = function(){
                console.log($scope.place);

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: $scope.place.geometry.location,
                    animation: google.maps.Animation.DROP
                });

                $scope.currentMarker = marker;
                //$scope.updateLocations;

                $scope.map.setCenter(marker.getPosition());

            }



            // $scope.getCoords = function(){
            //     var res = {};
            //     var latlng = $scope.marker.getPosition();
            //     res = latlng;
            //     return res;
            // }

            // $scope.setEventLocation = function(){
            //     var latlng = $scope.getCoords();

            // }

            $scope.isUser = true;
            $scope.isAdmin = false;
            $scope.isSuperAdmin = false;
            
            //event creation stuff
            $scope.master = {};
            $scope.saveEvent = function(event) {
                //createdEvents.push(angular.copy(event));
                //event.location = $scope.place.geometry.location;
                event.location = $scope.place;
                console.log(event);
                eventService.createEvent(event/*, $scope.orgname*/);
                $scope.resetEvent();
            };
            $scope.resetEvent = function() {
                $scope.event = angular.copy($scope.master);
            };
            $scope.resetEvent();

            //organization creation stuff
            $scope.saveOrg = function(rso) {
                //createdEvents.push(angular.copy(event));
                console.log(rso);
                orgService.createOrg(rso);
                $scope.resetOrg();
            };
            $scope.resetOrg = function() {
                $scope.rso = angular.copy($scope.master);
            };
            $scope.resetOrg();

            //university creation stuff
            $scope.saveUni = function(uni) {
                //createdEvents.push(angular.copy(event));
                uni.location = $scope.place.geometry.location;
                console.log(uni);
                uniService.createUni(uni);
                $scope.resetUni();
            };
            $scope.resetUni = function() {
                $scope.uni = angular.copy($scope.master);
            };
            $scope.resetUni();

            $scope.init = function(){
                var user = userService.getUserData();
                console.log(user);
                switch(user.userTypeID){
                    case 1:
                        $scope.isSuperAdmin = true;
                        break;
                    case 2: 
                        $scope.isAdmin = true;
                        break;
                    case 3:
                    //default to setting isUser to true. SHOULDN'T HAPPEN THOUGH
                    default:
                        $scope.isUser = true;
                        break;
                }
                // if (user.userTypeID == 1)
                //     $scope.isUser = true;
                // else if (user.userTypeID == 2)
                //     $scope.isAdmin = true;
                // else if (user.userTypeID == 3)
                //     $scope.isSuperAdmin = true;
            }

            $scope.init();

    }]);