angular.module('OrgCtrl', ['eventService'])
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
                
                var promise = eventService.getOrgEvents(org[1]);
                promise.then(function (data){
                    $scope.events = data.data;
                });
            };

        }]);