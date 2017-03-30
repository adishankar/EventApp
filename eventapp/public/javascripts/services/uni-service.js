angular.module('uniService',[])
    .service('uniService', ['$http', '$q', '$window', function uniService($http, $q, $window){
        
        var deferred = $q.defer();
        this.createUni = function(uni){
            $http.post('http://localhost:3000/dashboard', {
                type: "uni",
                uniName: uni.name.toString(),
                location: uni.location.toString(),
                description: uni.description.toString(),
                numStudents: uni.numStudents.toString()
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.getAllUniIds = function(){
            $http.post('http://localhost:3000/api/university')
                .then(function (data){
                    deferred.resolve(data);
                    console.log('got data');
                    console.log(data);
                });
                return deferred.promise;
        }

    }]);