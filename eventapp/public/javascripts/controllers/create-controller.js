angular.module('CreateCtrl', ['google.places'])
    .controller('CreateCtrl', ['$scope', '$window', 'userService','eventService', 'orgService', 'uniService', 
        function CreateCtrl($scope, $window, userService, eventService, orgService, uniService) {
            

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
                event.datetime = (document.getElementById('datetimepicker').value);
                event.enddatetime = (document.getElementById('datetimepicker2').value);
                console.log(event);
                var user = userService.getUserData();
                console.log(user);
                event.userId = user.userId;
                console.log(user);
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

            $scope.saveUni = function(uni, user){
                uni.location = $scope.place;
                console.log(uni);
                console.log(user);
                user.type=1;
                var prom = userService.createUser(user);
                prom.then(function(data){
                    console.log(data);
                    var uid = userService.getUserData().userID;
                    console.log(uid);
                    uni.userID = uid;
                    var prom2 = uniService.createUni(uni);
                    prom2.then(function(data2){
                        console.log("Data2");
                        console.log(data2);
                        userService.setUniversity(data2.data.insertId);
                        $scope.login(userService.getUserData());
                    });
                });
                
            }
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

            $scope.login = function(user){
                console.log(user);
                if(typeof user == 'undefined' || (user.emailAddress.toString() == "" || user.password.toString() == "")){
                    console.log("Hello");
                    $scope.errorMessage = 'Please input both an Email Address and Password';
                    return;
                }
                user.username = user.emailAddress;
                userService.login(user).then(function (data){
                    //console.log(data.data);
                    console.log("promise came back");
                    console.log(data.data);
                    console.log(typeof data.data);
                    if(typeof data.data == 'string'){
                        $window.location.href = '';
                        //$scope.errorMessage = 'Username or Password is incorrect. NOTE: username and password are case sensitive';
                        alert('Username or Password is incorrect. Please Double check your password. Passwords are case-sensitive');
                        return;
                    }
                    else{
                        userService.setUserData(data.data);
                        $window.location.href = '/dashboard';
                    }
                });
                //  var promise = userService.login(user);
                //  promise.then(function (data){
                //      //console.log(data.data);
                //      console.log("promise came back");
                //     console.log(data.data);
                //     if(data.data == "none"){
                //         $scope.errorMessage = 'Username or Password is incorrect. NOTE: username and password are case sensitive';
                //         return;
                //     }
                //     else{
                //         userService.setUserData(data.data);
                //         $window.location.href = '/dashboard';
                //     }
                //  });
                
            };
    }]);