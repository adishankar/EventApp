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
            //$scope.org = {};
            //initializes page with organization name taken from url and creates list of events held by an organization
            $scope.init = function(){
                var url = $location.url().toString();
                var org = url.split('rso/');
                $scope.orgname = org[1];
                console.log(org[1]);
                //Parameter is the organization id
                var promiseOrg = orgService.getOrgDetails(org[1]);
                promiseOrg.then(function(data){
                    $scope.orgname = data.data[0].RSOname;
                    $scope.org = data.data[0];
                })
                var promise = eventService.getOrgEvents(org[1]);
                promise.then(function (data){
                    console.log(data);
                    if(data == "No Events Currently"){
                        $scope.error = data;
                    }
                    $scope.events = data.data;
                });
                var user = userService.getUserData();
                var promise2 = orgService.isInRso(user.userID,$scope.orgname)
                promise2.then(function(data2){
                    console.log(data2)
                    $scope.joined = data2.data;
                })
            };

            //select an event from an organization 
            $scope.selectEvent = function(event){
                var url = '../event/' + event.id.toString();
                $window.location.href = url;
            };

            //allow a user to join an organization
            $scope.joinOrg = function(){
                console.log($scope.orgname);
                var user = userService.getUserData();
                console.log(user);
                var thisOrg = $scope.orgname;
                console.log("HERE");
                //console.log($scope.org);
                var promise = orgService.joinOrg(user.userID, $scope.org.RSOid);
                promise.then(function( data){
                    console.log(data.data);
                    $window.location.href = $window.location.href;
                });
            }

        }]);