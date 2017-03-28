angular.module('OrgCtrl', ['eventService'])
    .config(function($locationProvider){
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
    })
    .controller('OrgCtrl', ['$scope', '$location', '$window','eventService', 'userService', 'orgService',
         function OrgCtrl($scope, $location, $window, eventService, userService, orgService) {

            $scope.orgname = "";

            //initializes page with organization name taken from url and creates list of events held by an organization
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

            //select an event from an organization 
            $scope.selectEvent = function(event){
                var url = '../event/' + event.name.toString();
                $window.location.href = url;
            };

            //allow a user to join an organization
            $scope.joinOrg = function(){
                console.log($scope.orgname);
                var user = userService.getUserData();
                console.log(user);

                var promise = orgService.joinOrg(user.username, $scope.orgname.toString());
                promise.then(function( data){
                    console.log(data.data);
                });
            }

        }]);