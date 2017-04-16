angular.module('LoginCtrl', ['userService','uniService', 'eventService'])
    .controller('LoginCtrl', ['$scope', 'userService', 'uniService', 'eventService', '$http', '$window', '$location',
         function LoginCtrl($scope, userService, uniService, eventService, $http, $window, $location) {
         
         $scope.init = function(){
             console.log("init");
         }

         loginUser = $scope.login = function(user){
             console.log("login beginning");
            console.log(user);
            if(user == "existing")
            {
                return;
            }
            console.log(user.username);
            //if(typeof user == 'undefined' || (((typeof user.emailAddress != 'undefined' || user.emailAddress.toString() == "") || (typeof user.username != 'undefined' || user.username.toString() == "")) || user.password.toString() == "")){
            if(typeof user == 'undefined'){
                console.log("Hello");
                $scope.errorMessage = 'Please input both an Email Address and Password';
                return;
            }
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

        //  setTimeout(function(){
        //      var user = userService.getUserData();
        //      console.log(user);
        //  }, 100);

         $scope.createUser = function(user){
             if(!user || !user.username || !user.fName || !user.lName || !user.university || !user.password){
                 alert("All fields are required!");
                 return;
             }
            //  console.log(JSON.stringify(user));
            //console.log(user.username.substring(user.username.length - 4, user.username.length));
             if(user.username.substring(user.username.length - 4, user.username.length).toUpperCase() != ".edu".toUpperCase()){
                alert("You are required to use a .edu email address. Please try again!");
                return;
             }
             user.type = 3;
            //  console.log("HELLO\n");
             console.log(JSON.stringify(user));
             var promise = userService.createUser(user);
             promise.then(function (data2){
                 //while(data2.data == "");
                 $scope.errorMessage = "";
                 if(data2.data == 'existing'){
                     alert('Username: ' + user.username + ' already exists. Try a different email Address, or try to login if you already have an account.');
                     
                     $window.location.href="/signup";
                     //console.log(data2.data);
                     //user already exists, re route to login page, with error message;
                     //data2.data = "";
                     return;
                 }
                 console.log(data2.data);

                 loginUser(data2.data);
             });
         };

         $scope.signUp = function(){
             $window.location.href = '/signup';
         };

         $scope.createUni = function(){
             $window.location.href = '/createUni';
         }

         //$scope.universities = getUniversities();

         $scope.universities = [];

         function getUniversities(){
             //Get universities from db. format with universityID and universityName
             var promise = uniService.getAllUniIds();
             promise.then(function(data){
                 console.log('mofo');
                 //console.log(data);
                 console.log(data.data);
                 $scope.universities = data.data;
             })
         }

         /*this.universities = */
         console.log($window.location.pathname)
         if($window.location.pathname == '/signup'){
             getUniversities();
         }

         $scope.goBack = function(){
             $window.history.back();
         }
         //console.log(this.universities);
         $scope.getPublicEvents = function(start, end, timezone, cb){
            //call event service getPublicEvents
            var res = eventService.getPublicEvents()
            .then(function(data){
                console.log("data");
                console.log(data);
                cb(data);
                
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
                    events: $scope.getPublicEvents,
                    buttonIcons: {
                        prev: 'left-single-arrow',
                        next: 'right-single-arrow',
                        prevYear: 'left-double-arrow',
                        nextYear: 'right-double-arrow'
                    },
                });
            }
            

        });
     }]);