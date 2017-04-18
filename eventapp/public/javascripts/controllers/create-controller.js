angular.module('CreateCtrl', ['google.places'])
    .controller('CreateCtrl', ['$scope', '$window', '$location', 'userService','eventService', 'orgService', 'uniService', 
        function CreateCtrl($scope, $window, $location, userService, eventService, orgService, uniService) {
            
            $scope.RSOs = []

            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(28.600659, -81.197546)
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            $scope.place = null;
            $scope.currentMarker = null;

            updateMap = $scope.updateMap = function(){
              // console.log($scope.place);

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: $scope.place.geometry.location,
                    animation: google.maps.Animation.DROP
                });

                $scope.currentMarker = marker;
                //$scope.updateLocations;

                $scope.map.setCenter(marker.getPosition());

            }

            updateMap2 = function(loc){
              // console.log($scope.place);
                console.log(loc);

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: loc,
                    animation: google.maps.Animation.DROP
                });

                $scope.currentMarker = marker;
                //$scope.updateLocations;

                $scope.map.setCenter(marker.getPosition());

            }
            
            $scope.isUser = true;
            $scope.isAdmin = false;
            $scope.isSuperAdmin = false;
            
            //event creation stuff
            $scope.master = {};
            $scope.saveEvent = function(event) {
                //createdEvents.push(angular.copy(event));
                //event.location = $scope.place.geometry.location;
                // event.rsoID = $scope.seleceted;
                event.location = $scope.place;
                event.datetime = (document.getElementById('datetimepicker').value);
                event.enddatetime = (document.getElementById('datetimepicker2').value);
              // console.log(event);
                var user = userService.getUserData();
              // console.log(user);
                event.userId = user.userID;
              // console.log(user);
                eventService.createEvent(event/*, $scope.orgname*/).then(function(data){
                    $window.location.href = "/dashboard";
                });
                $scope.resetEvent();
            };
            $scope.resetEvent = function() {
                $scope.event = angular.copy($scope.master);
            };
            $scope.resetEvent();

            //organization creation stuff
            $scope.saveOrg = function(rso) {
                //createdEvents.push(angular.copy(event));
                user = userService.getUserData();
                rso.userId = user.userID;
              // console.log(rso);
                orgService.createOrg(rso).then(function(data){
                    console.log(data);
                    if(data.data == "Missing details"){
                        alert("failed to create RSO. Try again");
                    }
                    else if(data.data == ""){
                        alert("Check that all email address have the same domain!");
                    }else{
                        $window.location.href = "/rso/" + data.data.insertId;                    
                    }
                });
                $scope.resetOrg();
            };
            $scope.resetOrg = function() {
                $scope.rso = angular.copy($scope.master);
            };
            $scope.resetOrg();

            //university creation stuff
            // $scope.saveUni = function(uni) {
            //     //createdEvents.push(angular.copy(event));
            //   // console.log($scope.image);
            //     uni.location = $scope.place.geometry.location;
            //   // console.log(uni);
            //     uniService.createUni(uni).then(function(data){
            //         console.log(data);
            //         userService.setUniversity(data.data.insertId);
            //     });
            //     $scope.resetUni();
            // };

            $scope.saveUni = function(uni, user){
                uni.location = $scope.place;
              // console.log(uni);
              // console.log(user);
                user.type=1;
                var prom = userService.createUser(user);
                prom.then(function(data){
                  // console.log(data);
                    var uid = userService.getUserData().userID;
                  // console.log(uid);
                    uni.userID = uid;
                    var prom2 = uniService.createUni(uni);
                    prom2.then(function(data2){
                      // console.log("Data2");
                      // console.log(data2);
                      console.log(data2);
                        userService.setUniversity(data2.data.insertId).then(function(data3){
                            console.log(data.data);
                            $scope.login(data.data);
                                                        
                        });
                    });
                });
                
            }
            $scope.resetUni = function() {
                $scope.uni = angular.copy($scope.master);
            };
            $scope.resetUni();

            $scope.init = function(){
                if($window.location.pathname.includes("createEvent")){
                    var url = $location.url().toString();
                    var urlPieces = url.split('createEvent/')
                  // console.log(urlPieces[1]);
                    $scope.selectedId = urlPieces[1];
                    $scope.event.rsoID = $scope.selectedId;
                    console.log($scope.event.rsoID);
                }
                var user = userService.getUserData();
                console.log(user);
                console.log($scope.place)
                uniService.getUniversityLocation(user.universityID).then(function(data2){
                    console.log(data2);
                    
                    var LatLng = {
                        lat: parseFloat(data2.data.locationLatitude),
                        lng: parseFloat(data2.data.locationLongitude)
                    };
                    updateMap2(LatLng);
                });
              // console.log(user);
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
                var promise = orgService.getJoinedOrgs(user.userID);
                promise.then(function (data){
                  // console.log(data.data);
                    //if(data.data == "no results"){
                        //$scope.error = "You have not joined any organizations!";
                    //}else{
                        $scope.RSOs = data.data;
                        $scope.selected = $scope.selectedId;
                        console.log($scope.RSOs);
                    //}
                    if(document.getElementById("adminemail")){
                        document.getElementById("adminemail").value = user.emailAddress;
                    }

                });
                // if (user.userTypeID == 1)
                //     $scope.isUser = true;
                // else if (user.userTypeID == 2)
                //     $scope.isAdmin = true;
                // else if (user.userTypeID == 3)
                //     $scope.isSuperAdmin = true;
            }

            $scope.init();

            $scope.login = function(user){
              // console.log(user);
                if(typeof user == 'undefined' || (user.emailAddress.toString() == "" || user.password.toString() == "")){
                  // console.log("Hello");
                    $scope.errorMessage = 'Please input both an Email Address and Password';
                    return;
                }
                user.username = user.emailAddress;
                userService.login(user).then(function (data){
                    //console.log(data.data);
                  // console.log("promise came back");
                  // console.log(data.data);
                  // console.log(typeof data.data);
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
                //    // console.log("promise came back");
                //   // console.log(data.data);
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