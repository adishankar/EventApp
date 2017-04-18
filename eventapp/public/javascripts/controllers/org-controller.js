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
            $scope.user;
            //$scope.org = {};
            //initializes page with organization name taken from url and creates list of events held by an organization
            $scope.init = function(){
                var url = $location.url().toString();
                var org = url.split('rso/');
                $scope.orgname = org[1];
              // console.log(org[1]);
                $scope.user = userService.getUserData();
                //Parameter is the organization id
                var promiseOrg = orgService.getOrgDetails(org[1]);
                promiseOrg.then(function(data){
                    $scope.orgname = data.data[0].RSOname;
                    $scope.org = data.data[0];
                    console.log(data.data[0]);
                    $scope.orgdescription = data.data[0].RSOdescription;
                    var promise = eventService.getOrgEvents(org[1]);
                    promise.then(function (data){
                      // console.log(data);
                        if(data == "No Events Currently"){
                            $scope.error = data;
                        }
                        $scope.events = data.data;
                      // console.log($scope.events.length);
                    });
                });
                var user = userService.getUserData();
                var promise2 = orgService.isInRso(user.userID,$scope.orgname)
                promise2.then(function(data2){
                  // console.log(data2)
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
              // console.log($scope.orgname);
                var user = userService.getUserData();
              // console.log(user);
                var thisOrg = $scope.orgname;
              // console.log("HERE");
                //console.log($scope.org);
                var promise = orgService.joinOrg(user.userID, $scope.org.RSOid);
                promise.then(function( data){
                  // console.log(data.data);
                    $window.location.href = $window.location.href;
                });
            }

            $scope.getOrganizationEvents = function(start, end, timezone, cb){
                //call event service getPublicEvents
              // console.log("hello")
                var orgid = $location.url().toString().split('rso/')[1];
              // console.log(orgid)
                var res = eventService.getOrgEvents(orgid)
                .then(function(data){
                  // console.log("data");
                  // console.log(data);
                    cb(data.data);
                    
                });
                //console.log(res);
            }

            $(document).ready(function() {

                // page is now ready, initialize the calendar...
                if($window.location.pathname != "/signup"){
                    $('#calendar').fullCalendar({
                        // put your options and callbacks here
                        timezone: "local",
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay,listWeek'
                        },
                        eventClick: function(callback, jsEvent, view){
                            $window.location.reload();
                        },
                        events: $scope.getOrganizationEvents,
                        buttonIcons: {
                            prev: 'left-single-arrow',
                            next: 'right-single-arrow',
                            prevYear: 'left-double-arrow',
                            nextYear: 'right-double-arrow'
                        },
                    });
                }
                

            });

            $scope.createEvent = function(rsoid){
                $window.location.href = "/createEvent/" + rsoid;
            };

            $scope.deleteOrg = function(orgid){
                console.log(orgid);
                orgService.deleteRso(orgid).then(function(data){
                    console.log(data);
                    $window.location.href = "/dashboard";
                });

            }

        }]);