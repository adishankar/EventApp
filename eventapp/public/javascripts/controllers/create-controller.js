angular.module('CreateCtrl', ['google.places'])
    .controller('CreateCtrl', ['$scope', 'userService','eventService', 'orgService', 'uniService', 
        function CreateCtrl($scope, userService, eventService, orgService, uniService) {
            
            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(28.600659, -81.197546)
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            $scope.place = null;

            $scope.updateMap = function(){
                console.log($scope.place);

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: $scope.place.geometry.location,
                    animation: google.maps.Animation.DROP
                });

                $scope.map.setCenter(marker.getPosition());

            }

            $scope.isUser = false;
            $scope.isAdmin = false;
            $scope.isSuperAdmin = false;
            
            //event creation stuff
            $scope.master = {};
            $scope.saveEvent = function(event) {
                //createdEvents.push(angular.copy(event));
                event.location = $scope.place.geometry.location;
                console.log(event);
                eventService.createEvent(event, $scope.orgname);
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
                if (user.level == 1)
                    $scope.isUser = true;
                else if (user.level == 2)
                    $scope.isAdmin = true;
                else if (user.level == 3)
                    $scope.isSuperAdmin = true;
            }

    }]);