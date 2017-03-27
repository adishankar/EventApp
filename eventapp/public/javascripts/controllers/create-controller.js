angular.module('CreateCtrl', [])
    .controller('CreateCtrl', ['$scope', 'eventService', 'orgService', 'uniService', function CreateCtrl($scope, eventService, orgService, uniService) {
            
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