angular.module('CreateCtrl', ['google.places'])
    .controller('CreateCtrl', ['$scope', 'eventService', 'orgService', 'uniService', 
        function CreateCtrl($scope, eventService, orgService, uniService) {
            
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

            //event creation stuff
            $scope.master = {};
            $scope.saveEvent = function(event) {
                //createdEvents.push(angular.copy(event));
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
                console.log(uni);
                uniService.createUni(uni);
                $scope.resetUni();
            };
            $scope.resetUni = function() {
                $scope.uni = angular.copy($scope.master);
            };
            $scope.resetUni();

    }]);